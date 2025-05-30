import { createContext, useContext, useState } from 'react';

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
