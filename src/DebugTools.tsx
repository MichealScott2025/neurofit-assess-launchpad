import React, { useState, useEffect, useRef } from "react";

export default function DebugTools() {
  const [logs, setLogs] = useState([]);
  const originalConsoleLogRef = useRef(console.log);
  const originalConsoleErrorRef = useRef(console.error);

  useEffect(() => {
    // Override console.log and console.error
    console.log = (...args) => {
      originalConsoleLogRef.current(...args);
      setLogs(prev => [...prev, { type: 'log', args }]);
    };
    
    console.error = (...args) => {
      originalConsoleErrorRef.current(...args);
      setLogs(prev => [...prev, { type: 'error', args }]);
    };
    
    // Restore original console methods on unmount
    return () => {
      console.log = originalConsoleLogRef.current;
      console.error = originalConsoleErrorRef.current;
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '110px',
        right: '20px',
        width: '400px',
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        fontSize: '12px',
        fontFamily: 'monospace'
      }}
    >
      <h3>Debug Console</h3>
      {logs.map((log, index) => (
        <div 
          key={index}
          style={{
            color: log.type === 'error' ? 'red' : 'white',
            marginBottom: '5px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '5px'
          }}
        >
          {JSON.stringify(log.args)}
        </div>
      ))}
    </div>
  );
}