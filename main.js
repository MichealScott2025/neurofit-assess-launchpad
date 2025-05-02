// Simple React application with chat functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get the root element
    const rootElement = document.getElementById('root');
    
    // Create a basic UI
    rootElement.innerHTML = `
      <div style="font-family: 'Inter', sans-serif; max-width: 1000px; margin: 40px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h1 style="color: #0a1a2f; font-family: 'Poppins', sans-serif; font-size: 32px;">NeuroFit Assessments</h1>
        <p style="font-size: 18px; margin-bottom: 20px;">Welcome to the NeuroFit assessment platform.</p>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
          <div style="background: #f0f7ff; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">Personality Test</h3>
            <p>Evaluate comprehensive personality traits with our evidence-based assessment.</p>
          </div>
          <div style="background: #f0f7ff; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">Cognitive Aptitude</h3>
            <p>Measure skills-based cognitive abilities that predict job performance.</p>
          </div>
          <div style="background: #f0f7ff; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-bottom: 10px;">Cultural-Fit Builder</h3>
            <p>Customize assessment based on your organization's unique values.</p>
          </div>
        </div>
      </div>
    `;
  
    // Add chat widget
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
      <div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <div id="chat-container" style="width: 350px; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); overflow: hidden; display: none;">
          <div style="background: linear-gradient(to right, #2563eb, #3b82f6); color: white; padding: 15px; font-weight: 500;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>NeuroFit Assistant</span>
              <button id="minimize-chat" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">✕</button>
            </div>
          </div>
          <div id="chat-messages" style="height: 300px; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px;"></div>
          <div style="padding: 10px; border-top: 1px solid #e5e7eb;">
            <div style="display: flex; gap: 10px;">
              <input id="chat-input" type="text" placeholder="Type your message..." 
                style="flex: 1; padding: 10px; border: 1px solid #d1d5db; border-radius: 20px; outline: none;" />
              <button id="send-message" 
                style="background: #2563eb; color: white; border: none; border-radius: 20px; padding: 10px 15px; cursor: pointer;">
                Send
              </button>
            </div>
          </div>
        </div>
        <button id="chat-button" 
          style="width: 60px; height: 60px; background: linear-gradient(to right, #2563eb, #3b82f6); color: white; border: none; border-radius: 30px; 
          display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); float: right;">
          <span style="font-size: 24px;">💬</span>
        </button>
      </div>
    `;
    document.body.appendChild(chatWidget);
  
    // Chat functionality
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const minimizeChat = document.getElementById('minimize-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
  
    // Toggle chat window
    chatButton.addEventListener('click', () => {
      chatContainer.style.display = 'block';
      chatButton.style.display = 'none';
      
      // Add initial message if no messages
      if (chatMessages.children.length === 0) {
        addMessage('assistant', 'Hi there! How can I help you with NeuroFit assessments today?');
      }
    });
  
    // Minimize chat
    minimizeChat.addEventListener('click', () => {
      chatContainer.style.display = 'none';
      chatButton.style.display = 'flex';
    });
  
    // Send message on button click or Enter key
    sendMessage.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    });
  
    // Handle sending message
    async function handleSendMessage() {
      const message = chatInput.value.trim();
      if (!message) return;
      
      // Clear input
      chatInput.value = '';
      
      // Add user message to chat
      addMessage('user', message);
      
      // Show loading indicator
      const loadingMessage = document.createElement('div');
      loadingMessage.className = 'chat-message assistant-message loading';
      loadingMessage.innerHTML = `
        <div style="background: #f0f7ff; border-radius: 10px 10px 10px 0; padding: 10px; max-width: 80%; align-self: flex-start;">
          <div style="display: flex; gap: 4px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #2563eb; animation: blink 1s infinite;"></div>
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #2563eb; animation: blink 1s infinite 0.2s;"></div>
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #2563eb; animation: blink 1s infinite 0.4s;"></div>
          </div>
        </div>
      `;
      chatMessages.appendChild(loadingMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      try {
        // Send message to the ngrok tunnel URL
        const response = await fetch('https://6add-185-76-177-69.ngrok-free.app/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'mistral:latest',
            messages: [{role: 'user', content: message}]
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);
        
        // Add assistant response
        if (data && data.response) {
          // Clean response (remove thinking tags)
          let cleanResponse = data.response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          addMessage('assistant', cleanResponse);
        } else {
          throw new Error('Invalid response format');
        }
        
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);
        
        // Add error message
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
      }
    }
  
    // Add message to chat
    function addMessage(role, content) {
      const messageElement = document.createElement('div');
      messageElement.className = `chat-message ${role}-message`;
      
      if (role === 'user') {
        messageElement.innerHTML = `
          <div style="background: #dbeafe; border-radius: 10px 10px 0 10px; padding: 10px; max-width: 80%; align-self: flex-end; margin-left: auto;">
            ${content}
          </div>
        `;
      } else {
        messageElement.innerHTML = `
          <div style="background: #f0f7ff; border-radius: 10px 10px 10px 0; padding: 10px; max-width: 80%; align-self: flex-start;">
            ${content}
          </div>
        `;
      }
      
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    console.log('NeuroFit application loaded successfully');
  });