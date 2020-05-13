import React from 'react';

import './App.scss';
import Header from './components/Header/Header';
import { MainContent } from './components/MainContent/MainContent';
import { Footer } from './components/Footer/Footer';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <MainContent />
    <Footer />
  </div>
);

export default App;
