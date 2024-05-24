import React from 'react';
import './App.scss';
import { Header } from './components/header';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <h1>Product Catalog</h1>
  </div>
);

export default App;
