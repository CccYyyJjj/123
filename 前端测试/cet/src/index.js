import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Background from './Background';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Background />
    
  </React.StrictMode>
);

reportWebVitals();
