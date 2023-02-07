import React from 'react';
import { HashRouter } from 'react-router-dom';
import './styles/App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ContextProvider } from './helpers/ContextProvider';
import { Main } from './components/Main/Main';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ContextProvider>
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      </ContextProvider>
    </HashRouter>
  );
};

export default App;
