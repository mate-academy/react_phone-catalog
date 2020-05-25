import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Route path="/home" component={() => <h1>Home</h1>} />
        <Route path="/phones" component={() => <h1>phones</h1>} />
        <Route path="/tablets" component={() => <h1>tablets</h1>} />
        <Route path="/accessories" component={() => <h1>accessories</h1>} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
