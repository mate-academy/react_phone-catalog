import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import { MobilePhonesPage } from './components/MobilePhonesPage/MobilePhonesPage';
import Footer from './components/Footer/Footer';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/phones" component={MobilePhonesPage} />
        <Route path="/tablets" component={() => <h1>tablets</h1>} />
        <Route path="/accessories" component={() => <h1>accessories</h1>} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
