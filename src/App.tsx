import React from 'react';
import { AppRoutes } from './Routes/Route';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './styles/App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <React.StrictMode>
        <AppRoutes />
      </React.StrictMode>

      <Footer />
    </div>
  );
};

export default App;
