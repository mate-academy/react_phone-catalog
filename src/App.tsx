import { useEffect } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';
import { Howl } from 'howler';
import greetingFirst from '../src/sounds/greeting.mp3';

export const App = () => {
  const [searchParams] = useSearchParams();
  const aside = searchParams.get('aside') || '';
  const { pathname } = useLocation();

  useEffect(() => {
    new Howl({
      src: [greetingFirst],
      autoplay: true,
      loop: false,
      volume: 0.2,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      <Header />

      {aside && <Aside />}

      <Outlet />

      <Footer />
    </>
  );
};
