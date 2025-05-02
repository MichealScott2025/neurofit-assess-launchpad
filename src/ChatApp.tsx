import React, { useState, useRef, useEffect } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! How can I help you with NeuroFit assessments today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
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
    
    try {
      console.log("Sending message to API");
      
      // Using 127.0.0.1 instead of localhost
      const response = await fetch("http://127.0.0.1:3001/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "deepseek-r1:latest",
          messages: [...messages, userMessage]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received response:", data);
      
      if (data && data.message) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: data.message.content || "I received your message but couldn't generate a response."
        }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center">
        <span className="font-semibold">Support</span>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg max-w-[80%] ${
            msg.role === "user" ? "bg-blue-100 ml-auto" : "bg-white border border-gray-200"
          }`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="bg-gray-100 p-2 rounded-lg">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg p-2"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}