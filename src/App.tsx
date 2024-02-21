import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';
import { Main } from './components/Main/Main';

const App: React.FC = () => {
  return (
    <body>
      <Header />
      <Main />
      <Footer />
    </body>
  );
};

export default App;
