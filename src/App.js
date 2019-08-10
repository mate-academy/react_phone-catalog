import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import HomePage from './HomePage';
import Basket from './Basket';
import PhonesPage from './PhonesPage';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <Router>
    <div className="App">
      <Header  className ="Header"/>
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/basket" component ={Basket} />
          <Route path="/phones" exact component={props => <PhonesPage className="PhonePage" {...props} />} />
          <Route path="/phones/:idPhone" component={props => <PhoneDetailsPage {...props} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  </Router>
)

export default App;
