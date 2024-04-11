import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';

export const App = () => {
  const [searchParams] = useSearchParams();
  const aside = searchParams.get('aside') || '';

  return (
    <>
      <Header />

      {aside && <Aside />}

      <Outlet />

      <Footer />
    </>
  );
};
