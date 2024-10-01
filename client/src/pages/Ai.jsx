import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Ai = () => {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize the Gemini AI instance with your API key
  const genAI = new GoogleGenerativeAI("AIzaSyCBmIeGXKDeo44z0obpqRmT-XF2jFpJmEE"); // Replace with your actual API key

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    if (!inputValue.trim()) return; // Prevent empty prompts

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue(''); // Clear input after sending
      const response = result.response;
      const text = await response.text(); // Ensure to await for the response text

      setPromptResponses((prev) => [...prev, { user: inputValue, ai: text }]); // Update prompt responses
    } catch (error) {
      console.error("Error:", error);
      setPromptResponses((prev) => [...prev, { user: inputValue, ai: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl">
        <h2 className="text-5xl font-bold text-blue-700 text-center mb-8">AI Hacker</h2>
        <div className="flex flex-col space-y-6 mb-6 h-96 overflow-y-auto border border-gray-300 p-6 rounded-xl bg-gray-100">
          {promptResponses.map((response, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="p-4 bg-blue-700 text-white text-lg rounded-xl self-end shadow-lg">
                <strong>{response.user}</strong>
              </div>
              <div className="p-4 bg-gray-300 text-black text-lg rounded-xl self-start shadow-lg max-w-full">
                <div className="whitespace-pre-wrap break-words">
                  <strong>Response:</strong>
                  <br />
                  <span>{response.ai}</span>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500 text-xl">Loading...</div>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="flex-1 border-2 border-gray-400 rounded-2xl p-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={getResponseForGivenPrompt}
            className="ml-4 h-16 bg-blue-700 text-white text-2xl rounded-2xl px-8 hover:bg-blue-600 transition duration-300 shadow-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ai;
