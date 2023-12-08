from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
from decouple import config 

app = Flask(__name__)
CORS(app)
OPENAI_API_KEY = config('OPENAI_API_KEY')
openai.api_key = openai.api_key = OPENAI_API_KEY

@app.route('/audit', methods=['POST'])
def audit_contract():
    contract_code = request.json['contract']
    
    # Prompt 1: Security Analysis
    prompt1 = f"""
    Analyze the following Solidity smart contract code for potential vulnerabilities:

    {contract_code}

    Provide the analysis as follows:
    1. Security Analysis:
    - Check for Reentrancy vulnerabilities.
    - Look for issues with Gas Limit and Loops.
    - Identify Overflow and Underflow risks.
    - Examine External Contract Calls for potential security threats.
    - Assess for any Visibility issues with functions and state variables.
    """

    # Prompt 2: Efficiency and Gas Optimization
    prompt2 = f"""
    Analyze the following Solidity smart contract code for inefficiencies:

    {contract_code}

    Provide the analysis as follows:
    2. Efficiency and Gas Optimization:
    - Suggest optimizations for reducing gas cost.
    - Identify any redundant or unnecessary code.
    """

    # Prompt 3: Adherence to Best Practices and Summary
    prompt3 = f"""
    Analyze the following Solidity smart contract code for deviations from best practices and provide a summary:

    {contract_code}

    Provide the analysis as follows:
    3. Adherence to Best Practices:
    - Check for adherence to Solidity's best practices.
    - Evaluate naming conventions and code readability.
    - Review the contract's compliance with ERC standards (if applicable).

    4. Summary:
    - Provide a summary of findings and overall assessment of the contract's reliability and security.
    - Give a score out of 100 to the smart contract after doing the analysis.
    """

    response1 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes smart contracts."},
            {"role": "user", "content": prompt1}
        ]
    )

    response2 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes smart contracts."},
            {"role": "user", "content": prompt2}
        ]
    )

    response3 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that analyzes smart contracts."},
            {"role": "user", "content": prompt3}
        ]
    )

    # Extract the assistant's replies from the responses
    assistant_reply1 = response1['choices'][0]['message']['content']
    assistant_reply2 = response2['choices'][0]['message']['content']
    assistant_reply3 = response3['choices'][0]['message']['content']

    return jsonify({
        "result1": assistant_reply1.strip(),
        "result2": assistant_reply2.strip(),
        "result3": assistant_reply3.strip()
    })

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the home page"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
