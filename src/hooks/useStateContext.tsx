import { useContext } from 'react';
import { StateContext } from '../context/StateProvider';

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useStateContext must be used inside StateProvider');
  }

  return context;
};
