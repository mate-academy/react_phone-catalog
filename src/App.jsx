import React from 'react';

import './App.scss';
import Header from './components/Header/Header';
import { MainContent } from './components/MainContent/MainContent';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <MainContent />
  </div>
);

export default App;
