import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';
import { Howl } from 'howler';
import AOS from 'aos';
import 'aos/dist/aos.css';
import soundSecond from '../src/sounds/ARX_049_8_Outer_Body_Thomas_2003272.mp3';
import greetingFirst from '../src/sounds/greeting.mp3';

export const App = () => {
  const [searchParams] = useSearchParams();
  const aside = searchParams.get('aside') || '';

  useEffect(() => {
    new Howl({
      src: [greetingFirst, soundSecond],
      autoplay: true,
      loop: false,
      volume: 0.2,
    });

    AOS.init();
  }, []);

  return (
    <>
      <Header />

      {aside && <Aside />}

      <Outlet />

      <Footer />
    </>
  );
};
