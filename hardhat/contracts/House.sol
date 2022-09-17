// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract House is ERC721URIStorage {

    constructor() ERC721("HOUSE NFT", "HOUSENFT") {}

    function awardItem(address player, string memory tokenURI, uint256 newItemId)
        public
        returns (uint256)
    {
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
