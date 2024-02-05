import { Header } from './components/Header';
import './App.scss';
import { HomePage } from './Pages/HomePage';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
};
