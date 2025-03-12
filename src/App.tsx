import './App.scss';
import { HomePage } from './modules/HomePage';
import { Footer } from './shared/Footer';
import { Header } from './shared/Header';

export const App = () => {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <main className="main">
        <HomePage />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
