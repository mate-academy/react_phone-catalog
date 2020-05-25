import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { Home } from './components/Home/Home';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/phones" component={() => <h1>phones</h1>} />
        <Route path="/tablets" component={() => <h1>tablets</h1>} />
        <Route path="/accessories" component={() => <h1>accessories</h1>} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
