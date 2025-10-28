import { Header } from '@Header';
import { HomePage } from '@HomePage';
import { Footer } from '@GlobalComponents';
import './assets/styles/main.scss';

export const App = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
};
