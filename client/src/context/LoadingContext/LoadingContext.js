import { createContext , useContext } from "react";
// Create Loading Context
const LoadingContext = createContext();

// Custom hook to use Loading Context
const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export {LoadingContext , useLoading};