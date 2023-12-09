// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BlockAudit is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;

    struct User {
        address add;
        uint256 nfts;
    }

    Counters.Counter public nftCount;
    mapping(address => uint256[]) addressToNfts;
    address private owner;

    constructor() ERC721("BlockAuditToken", "BAT") {
        owner = msg.sender;
    }

    function mintBAT(string memory tokenURI) public nonReentrant returns (uint256) {
        nftCount.increment();
        uint256 currentNftId = nftCount.current();
        _mint(msg.sender, currentNftId);
        _setTokenURI(currentNftId, tokenURI);
        addressToNfts[msg.sender].push(currentNftId);
        return currentNftId;
    }

    function fetchAllForUser() public view returns (uint256[] memory) {
        return addressToNfts[msg.sender];
    }

    // Generate and mint an NFT with analysis text as metadata
    function generate_certificate(string memory analysisText) public nonReentrant {
        // Generate metadata dynamically using analysis text
        string memory tokenURI = generateMetadata(analysisText);

        // Mint the NFT with the generated metadata URI
        mintBAT(tokenURI);
    }

    function generateMetadata(string memory analysisText) internal pure returns (string memory) {
        // Create a simple JSON metadata with the analysis text
        string memory json = string(
            abi.encodePacked(
                '{"name": "Smart Contract Analysis Certificate",',
                '"description": "This NFT certificate contains the analysis of a smart contract.",',
                '"attributes": [',
                '{"trait_type": "Analysis Result","value": "', analysisText, '"}', ']}'
            )
        );
        return string(abi.encodePacked("data:application/json;base64,", bytesToBase64(bytes(json))));
    }

    function bytesToBase64(bytes memory data) internal pure returns (string memory) {
        bytes memory characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        uint256 len = data.length;
        if (len == 0) return "";
        uint256 encodedLen = 4 * ((len + 2) / 3);
        bytes memory result = new bytes(encodedLen);
        uint256 encodedIdx = 0;
        uint256 dataIndex = 0;

        for (uint256 i = 0; i < len; i += 3) {
            uint256 value = uint256(data[i]);
            value = (i + 1 < len) ? (value << 8) | uint256(data[i + 1]) : value;
            value = (i + 2 < len) ? (value << 8) | uint256(data[i + 2]) : value;

            for (uint256 j = 0; j < 4; j++) {
                if (i + j * 3 < len) {
                    uint8 byteValue = uint8((value >> (6 * (3 - j))) & 0x3f);
                    result[encodedIdx++] = characters[byteValue];
                } else {
                    result[encodedIdx++] = "=";
                }
            }
        }
        return string(result);
    }
}
