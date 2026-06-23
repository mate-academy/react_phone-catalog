import './App.scss';
import ReactDOM from 'react-dom/client';
import phones from '../public/api/phones.json';
import products from '../public/api/products.json';
import { Header } from './components/Header';
import { Body } from './components/body';
import { Footer } from './components/footer';

export const App = () => (
  <div className="App">
    <Header />
    <Body product={ products }
      phones={ phones }/>
    <Footer />
  </div>
);
