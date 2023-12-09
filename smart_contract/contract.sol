// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";



contract BlockAudit is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    struct User{
        address add;
        uint256 nfts;
    }

    Counters.Counter public nftCount;

    mapping(address => uint256[]) addressToNfts;

    address private owner;
    
    constructor() ERC721("BlockAuditToken", "BAT"){
        owner = msg.sender;
    }

    function mintBAT(string memory tokenURI) public nonReentrant returns(uint256) {
        nftCount.increment();    
        uint256 currentNftId = nftCount.current();
        _mint(msg.sender, currentNftId);
        _setTokenURI(currentNftId, tokenURI);
        addressToNfts[msg.sender].push(currentNftId);
        return currentNftId;
    }

    function fetchAllForUser() public view returns(uint256[] memory) {
        return addressToNfts[msg.sender];
    }  
    
}

// Deployed on Arbitrum Sepolia
// contract address : 0x528268f80FE98669D712f524aA4a66141218bbc5
// explorer link : https://sepolia-explorer.arbitrum.io/tx/0x5e2d1b92d526ae467fd1cc363f48fee7198da1a2f2a2d9dc060ae8f9dca3d7c4