import './App.scss';
import './styles/globals.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './components/Home/HomePage';

export const App = () => (
  <div className="App">
    <Header />
    <HomePage />
    <Footer />
  </div>
);
