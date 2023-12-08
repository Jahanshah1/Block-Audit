
import Img from "./BG.jpg";
import React, { useState, useEffect } from "react";

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const Application = () => {
  const [contractCode, setContractCode] = useState('');
  const [auditResult1, setAuditResult1] = useState('');
  const [auditResult2, setAuditResult2] = useState('');
  const [auditResult3, setAuditResult3] = useState('');

  const auditContract = async () => {
      try {
          const response = await fetch('http://localhost:5001/audit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ contract: contractCode }),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          // Ensure that the results are valid strings before setting state
          setAuditResult1(result.result1 || '');
          setAuditResult2(result.result2 || '');
          setAuditResult3(result.result3 || '');
          console.log(result.result1)
      } catch (error) {
          console.error('Error:', error);
          setAuditResult1('Failed to audit the contract.');
          setAuditResult2('Failed to audit the contract.');
          setAuditResult3('Failed to audit the contract.');
      }
  };

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