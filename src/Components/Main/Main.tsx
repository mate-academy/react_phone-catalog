import { FC } from 'react';
import './Main.scss';

export const Main: FC = ({ children }) => (
  <main className="main">
    <div className="container">
      {children}
    </div>
  </main>
);
