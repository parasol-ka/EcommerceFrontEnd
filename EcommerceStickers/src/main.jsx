import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './Components/Auth/AuthContext'; 
import { CartProvider } from './Components/Cart/CartContext';
import { FloatingAlertProvider } from './Components/Shared/FloatingAlertContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FloatingAlertProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </FloatingAlertProvider>
  </React.StrictMode>
);
