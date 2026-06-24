import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('UseMenu must be used within a MenuProvider');
  }

  return context;
};
