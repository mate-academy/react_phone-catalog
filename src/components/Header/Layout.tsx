// src/components/Layout.tsx
import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from '../Footer/Footer';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
