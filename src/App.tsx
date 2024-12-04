import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';

export const App = () => (
  <div className="App">
    <Header />

    <div className="container">
      <HomePage />
    </div>

    <Footer />
  </div>
);
