import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './Components/Auth/AuthContext'; 
import { CartProvider } from './Components/Cart/CartContext';
import { FloatingAlertProvider } from './Components/Shared/FloatingAlertContext';

/**
 * Entry point for the React application.
 *
 * - Wraps the main <App /> component with context providers:
 *   - FloatingAlertProvider: Provides floating alert context to the app.
 *   - BrowserRouter: Enables client-side routing.
 *   - AuthProvider: Manages authentication state.
 *   - CartProvider: Manages shopping cart state.
 */

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
