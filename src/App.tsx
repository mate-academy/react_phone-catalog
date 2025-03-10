import './App.scss';
import { Footer } from './modules/Footer';
import { Header } from './modules/Header/Components/Header';
import { HomePage } from './modules/HomePage';

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
