import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Img from './BG.jpg'



const Application = () => {
  const [contractCode, setContractCode] = useState("");
  const [auditResult1, setAuditResult1] = useState("");
  const [auditResult2, setAuditResult2] = useState("");
  const [auditResult3, setAuditResult3] = useState("");
  const [analysisText, setAnalysisText] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [userNFTs, setUserNFTs] = useState([]);

  
  useEffect(() => {
    // Initialize Web3 and contract connection
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          // Get the user's Ethereum address
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Replace 'YourContractABI' with your actual contract ABI
          const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "ERC721IncorrectOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ERC721InsufficientApproval",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "approver",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidApprover",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidOperator",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidReceiver",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidSender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ERC721NonexistentToken",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_fromTokenId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_toTokenId",
                        "type": "uint256"
                    }
                ],
                "name": "BatchMetadataUpdate",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "MetadataUpdate",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "tokenURI",
                        "type": "string"
                    }
                ],
                "name": "mintBAT",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "fetchAllForUser",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "nftCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "tokenURI",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
          // Replace 'YourContractAddress' with your actual contract address
          const contractAddress = '0x528268f80FE98669D712f524aA4a66141218bbc5';

          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contract);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.log("MetaMask not detected. Please install MetaMask extension.");
      }
    };

    initWeb3();
  }, []);

  const auditContract = async () => {
    try {
      const response = await fetch("http://localhost:5001/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contract: contractCode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAuditResult1(result.result1 || "");
      setAuditResult2(result.result2 || "");
      setAuditResult3(result.result3 || "");
    } catch (error) {
      console.error("Error:", error);
      setAuditResult1("Failed to audit the contract.");
      setAuditResult2("Failed to audit the contract.");
      setAuditResult3("Failed to audit the contract.");
    }
  };

  const mintCertificate = async () => {
    try {
      if (!web3) {
        alert("MetaMask not detected. Please install MetaMask extension.");
        return;
      }
  
      if (!contract) {
        alert("Contract not initialized.");
        return;
      }
  
      const combinedResult = `${auditResult1}\n${auditResult2}\n${auditResult3}`;
      if (!combinedResult.trim()) {
        alert("No audit results to mint.");
        return;
      }
  
      const gasAmount = await contract.methods.mintBAT(combinedResult).estimateGas({ from: account });
      const result = await contract.methods.mintBAT(combinedResult).send({ from: account, gas: gasAmount });
  
      if (result.status) {
        alert("Certificate minted successfully.");
      } else {
        alert("Certificate minting failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to mint the certificate.");
    }
  };
  

   const fetchUserNFTs = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const userAddress = accounts[0]; // Assuming the user is connected to their Ethereum wallet
      const userNFTIds = await contract.methods.fetchAllForUser().call({ from: userAddress });
      setUserNFTs(userNFTIds.map((e)=>e.toString()));
    } catch (error) {
      console.error("Error fetching user's NFTs:", error);
    }
  };

  useEffect(() => {
    // Fetch user's NFTs when the component mounts
    fetchUserNFTs();
  }, []);
  
  return (
    <div className="h-screen bg-center bg-cover bg-no-repeat relative flex items-center justify-center" style={{ backgroundImage: `url(${Img})`, backdropFilter: 'blur(10px)' }}>
      <div className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h1 className="text-white text-3xl">AI Contract Auditor</h1>
        <textarea
          value={contractCode}
          onChange={(e) => setContractCode(e.target.value)}
          rows="10"
          cols="50"
          className="textarea bg-gray-800 bg-opacity-25 text-white rounded p-4 my-4 w-full"
        ></textarea>
        <button className="btn2" onClick={auditContract}>
          <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
          </svg>
          <span className="text font-bold">Audit Contract</span>
        </button>
        
        <textarea
          value={analysisText}
          onChange={(e) => setAnalysisText(e.target.value)} // Update the analysis text
          rows="10"
          cols="50"
          className="textarea bg-gray-800 bg-opacity-25 text-white rounded p-4 my-4 w-full"
        ></textarea>
        
              <button className="btn2" onClick={mintCertificate}>
        <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>
        <span className="text font-bold">Mint Certificate</span>
      </button>

      <button className="btn2" onClick={fetchUserNFTs}>
      <span className="text font-bold">Fetch User NFTs</span>
    </button>

    <div>
      {userNFTs.map((nft, index) => (
        <p key={index}>{nft}</p>
      ))}
    </div>

      <div className="result-container" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
        <div className={`w-full p-4 rounded ${auditResult1 ? 'bg-gray-800 bg-opacity-25' : ''}`}>
          {auditResult1 && auditResult1.split('\n').map((line, index) => (
            <p key={index} className="text-white mb-2">
              {line}
            </p>
          ))}
        </div>
        <div className={`w-full p-4 rounded ${auditResult2 ? 'bg-gray-800 bg-opacity-25' : ''}`}>
          {auditResult2 && auditResult2.split('\n').map((line, index) => (
            <p key={index} className="text-white mb-2">
              {line}
            </p>
          ))}
        </div>
        <div className={`w-full p-4 rounded ${auditResult3 ? 'bg-gray-800 bg-opacity-25' : ''}`}>
          {auditResult3 && auditResult3.split('\n').map((line, index) => (
            <p key={index} className="text-white mb-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

  
};

export default Application;

