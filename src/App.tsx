import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <div className="App__main">
      <Outlet />
    </div>

    <Footer />
  </div>
);

export default App;
