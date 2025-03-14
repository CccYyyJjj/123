import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Background from './Background';
import reportWebVitals from './reportWebVitals';
import App from './Demo';
import Bpp from './cet';


const root = ReactDOM.createRoot(document.getElementById('root'));
//<Background/> <App /> <Bpp />
root.render(
  <React.StrictMode>
  
    <Background/>
    <App />
    

  </React.StrictMode>
);

reportWebVitals();
