import React from 'react';
import './Main.scss';

type Props = {
  children: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }) => (
  <main className="main">
    {children}
  </main>
);
