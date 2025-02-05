import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { HomePage } from './pages/HomePage';

export const App = () => (
  <div className="App">
    <Header />

    <Menu />

    <main className="main">
      <HomePage />
    </main>

    <Footer />
  </div>
);
