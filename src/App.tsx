import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';

export const App = () => (
  <div className="App">
    <Header />
    
    <HomePage />
    {false && (<Footer />)}
    
  </div>
);
