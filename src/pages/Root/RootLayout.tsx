import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import './RootLayout.scss';

export const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main className="root">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};
