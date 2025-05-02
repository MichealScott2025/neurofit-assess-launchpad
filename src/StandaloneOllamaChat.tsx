import React, { useState, useEffect } from "react";

export default function StandaloneOllamaChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [faqKnowledge, setFaqKnowledge] = useState("");
  
  // Load FAQ knowledge base
  useEffect(() => {
    fetch("/neurofit-faq.md")
      .then(response => response.text())
      .then(text => {
        setFaqKnowledge(text);
        console.log("FAQ Knowledge Base loaded");
      })
      .catch(error => console.error("Error loading FAQ:", error));
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    setError("");
    setResponse("");
    
    try {
      // Using the /api/generate endpoint with our FAQ knowledge base
      const result = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral:latest",
          prompt: `You are an AI assistant for NeuroFit, a platform that provides comprehensive personality, cognitive, and cultural fit assessments to help companies find their perfect candidates.
          
FAQ KNOWLEDGE BASE:
${faqKnowledge}

When answering questions, prioritize information from the FAQ Knowledge Base above. Keep your responses brief and focused on directly answering the user's specific question. Don't provide general information unless specifically asked. Limit responses to 1-3 sentences when possible. If the question cannot be answered using the FAQ, use your general knowledge to provide a helpful but concise response.

User: ${prompt}
Assistant:`,
          stream: false  // Don't stream the response
        }),
      });
      
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      
      const data = await result.json();
      console.log("Generate API response:", data);
      
      if (data && data.response) {
        // Clean up the response (remove <think> tags if present)
        let cleanResponse = data.response;
        cleanResponse = cleanResponse.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        setResponse(cleanResponse);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-xl font-bold mb-4">NeuroFit Assessment Chatbot</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything about NeuroFit assessments..."
          className="w-full p-2 border rounded mb-2 h-32"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          className={`px-4 py-2 rounded ${
            isLoading ? "bg-gray-400" : "bg-blue-600 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Generating response..." : "Send"}
        </button>
      </form>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {response && (
        <div className="border rounded p-4 bg-gray-50">
          <h3 className="font-bold mb-2">Response:</h3>
          <div className="whitespace-pre-wrap">{response}</div>
        </div>
      )}
    </div>
  );
}