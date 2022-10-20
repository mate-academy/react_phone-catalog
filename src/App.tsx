import { Outlet } from 'react-router-dom';
import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => (
  <main className="App">
    <Header />

    <Outlet />

    <Footer />
  </main>
);

export default App;
