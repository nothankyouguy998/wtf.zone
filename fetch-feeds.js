import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to wtf.zone!</h1>
      <p>Your source for weird and viral content.</p>
      <ul>
        <li>Post 1: This is a placeholder post.</li>
        <li>Post 2: More cool content coming soon.</li>
        <li>Post 3: Stay tuned!</li>
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
