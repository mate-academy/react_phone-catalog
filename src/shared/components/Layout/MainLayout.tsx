import { ReactNode } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Cookie } from '../Cookie';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

      <Cookie />
    </>
  );
};
