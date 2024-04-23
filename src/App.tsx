import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Aside } from './components/Aside';
import { Footer } from './components/Footer';
import { Howl } from 'howler';
import greetingFirst from '../src/sounds/greeting.mp3';
import { CSSTransition } from 'react-transition-group';

export const App = () => {
  const [searchParams] = useSearchParams();
  const aside = searchParams.get('aside') || '';
  const { pathname } = useLocation();
  const nodeRef = useRef(null);

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

      <CSSTransition
        nodeRef={nodeRef}
        in={!!aside}
        timeout={300}
        classNames={{
          appear: 'opacity-0',
          appearActive: 'transition-opacity duration-300 opacity-100',
          enter: 'opacity-0',
          enterActive: 'transition-opacity duration-300 opacity-100',
          exitActive: 'transition-opacity duration-200 opacity-0',
        }}
        unmountOnExit
      >
        <Aside ref={nodeRef} />
      </CSSTransition>

      <Outlet />

      <Footer />
    </>
  );
};
