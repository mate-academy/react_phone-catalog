import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import HomePage from './HomePage';
import BasketPage from "./BasketPage";
import PhonesPage from './PhonesPage';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';

export const BasketContext = React.createContext();

const App = () => {

  const [basketItems, addBasketItem] = useState([]);

  const handleClickAdd = (item) => {
    addBasketItem([...basketItems, item])
  }

  return (
    <BasketContext.Provider value={{items: basketItems, handleCliCkAdd: handleClickAdd}}>
      <Router>
        <div className="App">
          <Header className="Header" />
          <main>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/basket" component={BasketPage} />
              <Route path="/phones" exact component={props => <PhonesPage className="PhonePage" {...props} />} />
              <Route path="/phones/:idPhone" component={props => <PhoneDetailsPage {...props} />} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </Router>
    </BasketContext.Provider>
  )
}

export default App;
