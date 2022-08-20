// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";
contract WavePortal {
    uint256 totalWaves;
    mapping (address=>uint256) public senders;
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }
    function wave() public {
        totalWaves += 1;
        senders[msg.sender] = totalWaves;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getSendersWaves() public view returns (uint256) {
        uint256 re = senders[msg.sender];
        console.log("%s waved at %d!", msg.sender, re);
        return re;
    }
}

