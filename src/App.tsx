import './App.scss';
import ReactDOM from 'react-dom/client';
import phones from '../public/api/phones.json';
import { Header } from './components/Header';
import { Body } from './components/body';
import { Footer } from './components/footer';

export const App = () => (
  <div className="App">
    <Header />
    <Body product={ phones }/>
    <Footer />
  </div>
);
