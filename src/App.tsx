import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <Header />
    <div className="App__content">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
