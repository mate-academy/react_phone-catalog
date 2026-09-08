import './styles/_global.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { IntroProvider, useIntro } from './providers/IntroProvider';
import { IntroOverlay } from './components/IntroOverlay';
import { PageTransitionOverlay } from './components/PageTransitionOverlay';

const AppContent = () => {
  const { introOverlayVisible } = useIntro();

  return (
    <>
      {introOverlayVisible && <IntroOverlay />}

      <PageTransitionOverlay />
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export const App = () => (
  <IntroProvider>
    <AppContent />
  </IntroProvider>
);
