import { useContext } from 'react';
import { LangContext } from '../store/LangContext';

export const useLang = () => {
  const langContext = useContext(LangContext);

  if (!langContext) {
    throw new Error('useLang must be used inside a LangContextProvider');
  }

  return langContext;
};
