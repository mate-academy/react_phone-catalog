import './App.scss';
import { phones } from '../api/phones';
import { Header } from './components/Header';
import { Body } from './components/body';
import { Footer } from './components/footer';


export const App = () => (
  <div className="App">
    <Header />
    <Body phones={ phones }/>
    <Footer />
  </div>
);
