import React, { useState, useRef, useEffect } from "react";

export default function DirectOllamaChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! How can I help you with NeuroFit assessments today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [faqKnowledge, setFaqKnowledge] = useState("");
  const messagesEndRef = useRef(null);
  
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
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      console.log("Sending message to Ollama using generate endpoint");
      
      // Use the generate endpoint with stream: false instead of the chat endpoint
      const payload = {
        model: "mistral:latest",
        prompt: `You are an AI assistant for NeuroFit, a platform that provides comprehensive personality, cognitive, and cultural fit assessments to help companies find their perfect candidates.

FAQ KNOWLEDGE BASE:
${faqKnowledge}

When answering questions, prioritize information from the FAQ Knowledge Base above. Keep your responses brief and focused on directly answering the user's specific question. Don't provide general information unless specifically asked. Limit responses to 1-3 sentences when possible. If the question cannot be answered using the FAQ, use your general knowledge to provide a helpful but concise response.

Chat History:
${messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')}
User: ${userMessage.content}
Assistant:`,
        stream: false
      };
      
      console.log("Request payload:", JSON.stringify(payload, null, 2));
      
      // Connect to Ollama
      const response = await fetch("http://localhost:11434/api/generate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Generate API response:", data);
      
      if (data && data.response) {
        // Clean up the response (remove <think> tags if present)
        let cleanResponse = data.response;
        cleanResponse = cleanResponse.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: cleanResponse || "I received your message but couldn't generate a response."
        }]);
      } else {
        throw new Error("Invalid response format: missing response field");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMsg(`Error: ${error.message}`);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col">
      {/* Chat button when collapsed */}
      {isCollapsed ? (
        <button 
          onClick={toggleCollapse}
          className="self-end w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      ) : (
        <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 transform transition-all duration-300 animate-fadeIn">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-96">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-2xl max-w-[80%] animate-slideIn ${
                  msg.role === "user" 
                    ? "bg-blue-100 ml-auto rounded-tr-none" 
                    : "bg-white border border-gray-100 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Error message if any */}
          {errorMsg && (
            <div className="bg-red-50 border-t border-red-200 text-red-700 px-4 py-2 text-sm">
              {errorMsg}
            </div>
          )}
          
          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 py-2 px-4 pr-10 outline-none border border-gray-200 rounded-full focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center disabled:bg-gray-300"
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Close/minimize button */}
          <button 
            onClick={toggleCollapse}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}