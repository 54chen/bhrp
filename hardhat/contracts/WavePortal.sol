// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("[smart contract]Yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    mapping(string => Wave[]) private waveMap;

    function wave(string memory _message, string memory _to) public {
        require(
            lastWavedAt[msg.sender] + 5 minutes < block.timestamp,
            "[smart contract]Wait 5mins"
        );
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("[smart contract]%s waved w/ message %s to %s", msg.sender, _message, _to);
        waveMap[_toLower(_to)].push(
            Wave(msg.sender, _message, block.timestamp)
        );
        emit NewWave(msg.sender, block.timestamp, _message);
        seed = (block.difficulty + block.timestamp + seed) % 100;
        uint256 prizeAmount = 0.00001 ether;
        console.log('[smart contract]balance:',address(this).balance);
        if (seed <= 50) {
            prizeAmount = prizeAmount * 2;
            console.log("[smart contract]%s won! Reward value: %s", msg.sender, prizeAmount);
        }
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("[smart contract]We have %d waves!", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        Wave[] memory re = waveMap[_toLower(toString(msg.sender))];
        return re;
    }

    function toString(address account) public pure returns (string memory) {
        return toString(abi.encodePacked(account));
    }

    function _toLower(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint256 i = 0; i < bStr.length; i++) {
            // Uppercase character...
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
                // So we add 32 to make it lowercase
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }

    function toString(uint256 value) public pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes32 value) public pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes memory data) public pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdefABCDEF";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint256(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint256(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
}
