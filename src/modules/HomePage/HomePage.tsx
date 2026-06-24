import { useMyContext } from '../../Context/ProductContexts';
import { MainContent } from './MainContent';
import { BurgerMenu } from '../BurgerMenu';
import React from 'react';

export const HomePage: React.FC = () => {
  const { isMenuOpen } = useMyContext();

  return <div>{isMenuOpen ? <BurgerMenu /> : <MainContent />}</div>;
};
