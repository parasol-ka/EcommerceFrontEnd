import { createContext, useContext, useState } from 'react';

/** * FloatingAlertContext provides a way to show temporary alerts
 * at the top of the screen for user actions like adding to cart, checkout 
 * or eventual problems by different Bootstrap alert's types.
 * Alerts disappear after 2.5 seconds.
 */

const FloatingAlertContext = createContext();
export const useFloatingAlert = () => useContext(FloatingAlertContext);

export const FloatingAlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 2500);
  };

  return (
    <FloatingAlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div className={`floating-alert alert alert-${alert.type} text-center`}>
          {alert.message}
        </div>
      )}
    </FloatingAlertContext.Provider>
  );
};
