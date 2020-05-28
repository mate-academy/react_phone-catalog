import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import { MobilePhonesPage } from './components/MobilePhonesPage/MobilePhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import Footer from './components/Footer/Footer';
// import Phones from './components/Phones';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" exact component={Home} />
        <Route path="/phones" exact component={MobilePhonesPage} />
        <Route path="/tablets" exact component={TabletsPage} />
        <Route path="/accessories" exact component={AccessoriesPage} />

        <Route path="/:section/:productId?" exact component={ProductDetailsPage} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
