import React from 'react';
import './Header.scss';
import { Logo } from '@/shared/ui/Logo/Logo';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Logo className="header__logo"></Logo>
    </header>
  );
};
