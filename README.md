# BlockAudit 
An AI based smart contract auditor for assuring quality and ensuring security to Arbitrum
<img width="1454" alt="Screenshot 2023-12-10 at 2 33 06 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/ef387200-0090-4652-8c21-ec386277889d">


## Purpose 
In a rapidly evolving Web3 landscape, where an increasing number of smart contracts handle significant real-world financial transactions, the immutable nature of these protocols means that even minor errors can lead to substantial financial losses. Therefore, it's crucial to prioritize not only security but also affordability and accessibility, ensuring that these advanced technologies can be safely and efficiently utilized across a broad spectrum of users and applications. BlockAudit is not just an AI platform, its a platform which showcases what autonomous systems can do effeciently in a human dominated domain

## The Problem it solves 
- Security and Integrity Assurance: BlockAudit rigorously evaluates smart contracts for potential vulnerabilities and efficiency optimizations. It provides a comprehensive analysis complete with a quantifiable scoring system, ensuring a high level of security and integrity for the audited contracts.

- Affordability for Early Stage Startups: Traditional smart contract audits can be prohibitively expensive, especially for early-stage Web3 startups. BlockAudit offers a cost-effective alternative, delivering reliable and affordable auditing services. This makes it an attractive solution for startups seeking quality audits without the hefty price tag.

- Streamlined Efficiency: Traditional auditing processes can be cumbersome, involving extensive formalities and often resulting in prolonged waiting periods. BlockAudit revolutionizes this by offering a swift analysis, capable of auditing a contract within minutes. This rapid turnaround significantly reduces downtime and accelerates deployment schedules.

- Simplified User Experience: BlockAudit eliminates the complexities typically associated with smart contract audits. Users are spared the conventional hassles of lengthy consultations, contract negotiations, and bureaucratic procedures. This simplicity and ease of use make BlockAudit an accessible tool for a wide range of users, regardless of their technical background or familiarity with blockchain technologies.


## Screenshots of Dapp
### Home page
<img width="1470" alt="Screenshot 2023-12-10 at 5 38 14 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/cc666f48-c831-473d-a4f4-652d03fadd59">

### Application page 
<img width="1462" alt="Screenshot 2023-12-10 at 5 39 42 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/2e0a2500-0211-4dad-bb40-e658e54404e2">

### Application page in action
<img width="1470" alt="Screenshot 2023-12-10 at 5 42 02 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/1da26447-416b-44d3-952f-98ecd1f78289">

This was the code given 
```solidity
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
```
## And this is the whole output :
Security Analysis:

1. Reentrancy Vulnerabilities: The code does not contain any external contract calls that could potentially trigger reentrancy attacks. Therefore, there are no apparent reentrancy vulnerabilities in this smart contract.

2. Gas Limit and Loops: The code does not contain any gas-intensive operations or loops that could potentially exceed the gas limit. It uses the OpenZeppelin Counters library to manage the incrementing of the NFT count, which is a gas-efficient approach.

3. Overflow and Underflow Risks: The code does not perform any arithmetic operations that could lead to overflow or underflow risks. The only increment operation is handled by the Counters library, which ensures that the counter cannot exceed its maximum value.

4. External Contract Calls: The code does not contain any external contract calls. All the functions are self-contained within the smart contract itself.

5. Visibility Issues: The visibility modifiers for the functions and state variables are appropriately set. The `mintBAT` function is marked as public, allowing anyone to mint a BlockAuditToken. The `fetchAllForUser` function is marked as public view, allowing anyone to fetch the NFTs associated with their address. The state variables are marked as private or internal where appropriate.

Overall, the smart contract code does not exhibit any apparent vulnerabilities or security threats. However, it is always recommended to perform a comprehensive audit and testing before deploying any smart contract to ensure its security and correctness.

Efficiency and Gas Optimization:

1. Redundant Import Statement: The code imports the `Counters.sol` file twice, resulting in a redundant import statement. One of the import statements should be removed.

2. Use of ERC721URIStorage: The contract inherits the ERC721URIStorage extension, which allows for the storage of the tokenURI for each NFT. However, if storing the tokenURI is not a requirement, you can potentially save gas costs by using the regular ERC721 contract instead of the ERC721URIStorage extension.

3. Storage and Retrieval of NFTs: The contract maintains a mapping `addressToNfts` to store the NFT tokens owned by each address. While this approach provides the ability to fetch all NFTs for a specific user, it also consumes additional gas and storage. Consider whether it is necessary to store and retrieve all NFTs for a user, as this can become inefficient and consume more gas as the number of NFTs increases. If you only need to check the ownership of a specific token, the `balanceOf` function from the ERC721 contract can be used.

4. Use of Counters.Counter: The code uses the Counters.Counter from the `Counters.sol` library to manage the ID of the NFT tokens. This is a useful approach to ensure unique ID generation, but be mindful of potential gas costs associated with incrementing the counter on each mint. If the order of token IDs is not important, you can consider using a random or hash-based ID generation approach instead of a sequential counter.

5. Owner Variable: The `owner` variable is declared but not used in the code. If it serves no purpose, you can remove it to optimize gas consumption.

6. ReentrancyGuard: The contract inherits the ReentrancyGuard extension, which protects against reentrancy attacks. If your contract does not have any critical state changes or external calls that might be vulnerable to reentrancy attacks, you can consider removing this extension to reduce gas costs.

Overall, the code appears to be well-structured, but there are opportunities to optimize gas consumption and reduce redundancy. Implementing the suggested optimizations can help improve the efficiency of the smart contract.

3. Adherence to Best Practices:

- The code imports libraries and contracts from OpenZeppelin, which is a good practice as it promotes reuse of well-audited code.

- The contract uses the SPDX-License-Identifier to specify the license, which is a best practice for open-source projects.

- The contract uses SafeMath under the hood through the Counters library, which avoids potential arithmetic overflow and underflow issues.

- The contract uses the nonReentrant modifier from the ReentrancyGuard library to prevent reentrancy attacks.

- The contract follows the ERC721 standard by inheriting from ERC721URIStorage and implementing the required functions.

4. Summary:

The code is generally well-written and follows best practices. It imports commonly used libraries from OpenZeppelin, implements the ERC721 standard, and uses SafeMath and the nonReentrant modifier to ensure security. The naming conventions and code readability are acceptable. However, it could benefit from more detailed comments explaining the purpose and functionality of each function. Overall, the contract appears to be reliable and secure.

Score: 90/100



## Minting a NFT as a certificate
<img width="1470" alt="Screenshot 2023-12-10 at 5 45 29 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/a74a23f0-48b2-4b1e-969a-4d201f6ced8e">

<img width="445" alt="Screenshot 2023-12-10 at 5 45 43 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/3bc9efeb-167b-4a6b-a05c-fdc7e4d3f951">

<img width="1470" alt="Screenshot 2023-12-10 at 5 45 57 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/6ffef290-e07b-4049-a62a-3677485a00fd">

## CID of the uploaded text ( output data )
<img width="332" alt="Screenshot 2023-12-10 at 5 47 32 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/ee2d6fd9-1d0e-495f-bf7d-abc58c9b2830">

<img width="1469" alt="Screenshot 2023-12-10 at 5 48 28 AM" src="https://github.com/Jahanshah1/Block-Audit/assets/92823408/2c6e59ea-dee8-40f4-a0c6-b2a2a636488a">


## Run locally 
Clone the project 
```bash 
git clone https://github.com/Jahanshah1/Block-Audit
```
Go to app directory 
```bash 
cd app
```
Install dependencies 
```bash 
npm i 
```
Note - you will need OpenAI API key to use this and Lighthouse API key to store the output on IPFS
start server
```bash 
cd server
python3 server.py
```
start front-end 
```bash
npm start
```

If there are any problems please contact me shahjahanrajan@gmail.com
