import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <main className="content container">
      <Outlet />
    </main>

    <Footer />
  </div>
);

export default App;
