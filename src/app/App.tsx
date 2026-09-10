import { Header } from '../modules/shared//components/Header';
import { Footer } from '../modules/shared/components/Footer';
import { AppRouter } from './router';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
};
