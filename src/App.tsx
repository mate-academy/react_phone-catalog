import { Outlet } from 'react-router-dom';
import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Outlet />

    <Footer />
  </div>
);

export default App;
