import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContextProvider } from './components/ContextProvider';
import { Main } from './components/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
