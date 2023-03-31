import { FC } from 'react';

export const Main: FC = ({ children }) => (
  <main className="main">
    <div className="container">
      {children}
    </div>
  </main>
);
