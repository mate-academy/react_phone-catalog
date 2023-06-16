import { FC } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import './layout.scss';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main">
        {children}
      </div>
      <Footer />
    </>
  );
};
