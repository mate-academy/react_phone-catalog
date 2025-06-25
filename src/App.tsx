import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';

export const App = () => (
  <div className="App">
    {/* <h1>Product Catalog</h1> */}
    <Header />
    <HomePage />
    <Footer />
  </div>
);
