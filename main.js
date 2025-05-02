// Simple diagnostic script to ensure JavaScript is loading correctly
document.addEventListener('DOMContentLoaded', () => {
    // Get the root element
    const rootElement = document.getElementById('root');
    
    // Create a basic UI
    rootElement.innerHTML = `
      <div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h1 style="color: #0a1a2f; font-family: 'Poppins', sans-serif; font-size: 32px;">NeuroFit Assessments</h1>
        <p style="font-size: 18px; margin-bottom: 20px;">Welcome to the NeuroFit assessment platform.</p>
        
        <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #2563eb; font-size: 22px;">Diagnostic Information</h2>
          <p>JavaScript is successfully running!</p>
          <p>Page URL: <span id="page-url"></span></p>
          <p>Page Path: <span id="page-path"></span></p>
        </div>
        
        <div style="display: flex; gap: 10px;">
          <button 
            id="test-button"
            style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;"
          >
            Test Interaction
          </button>
        </div>
        
        <div id="test-output" style="margin-top: 20px;"></div>
      </div>
    `;
    
    // Add URL information
    document.getElementById('page-url').textContent = window.location.href;
    document.getElementById('page-path').textContent = window.location.pathname;
    
    // Add button functionality
    document.getElementById('test-button').addEventListener('click', () => {
      document.getElementById('test-output').innerHTML = `
        <div style="background: #ecfdf5; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
          <p>Button click detected at: ${new Date().toLocaleTimeString()}</p>
          <p>JavaScript is working correctly!</p>
        </div>
      `;
    });
    
    // Log for debugging
    console.log('NeuroFit diagnostic script loaded successfully');
  });