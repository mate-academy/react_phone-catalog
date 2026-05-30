import { ReactNode } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => (
  <>
    <Header />
    <main id="content">{children}</main>
    <Footer />
  </>
);
