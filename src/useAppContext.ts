import { useContext } from 'react';
import { AppContext } from './AppContext';

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside Provider');
  }

  return context;
};

export default useAppContext;
