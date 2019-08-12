import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import HomePage from './HomePage';
import BasketPage from "./BasketPage";
import PhonesPage from './PhonesPage';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';

export const BasketContext = React.createContext();

const App = () => {

  const [basketItems, addBasketItem] = useState([]);

  const handleClickAdd = (event, item) => {
    event.preventDefault();
    addBasketItem([...basketItems, item]);
  }

  const handleClickClear = (index) => {
    addBasketItem(basketItems.filter((item, i) => i!==index));
  }

  const handleClickChangeCount = (direction ,index) => {
    switch (direction) {
      case 'up': addBasketItem(basketItems.map((item, i) => {
        if(i ===index) {
          return {...item, count: item.count + 1 }
        } else {
          return item;
        }
      }))
      break;
      case 'down': addBasketItem(basketItems.map((item, i) => {
        if(i ===index) {
          return {...item, count: (item.count===0) ? 0 : item.count - 1 }
        } else {
          return item;
        }
      }))
      break;
    }
  }

  return (
    <BasketContext.Provider value={{items: basketItems, handleCliCkAdd: handleClickAdd, handleClickClear: handleClickClear, handleClickChangeCount: handleClickChangeCount }}>
      <Router>
        <div className="App">
          <Header className="Header" />
          <main>
            <Switch>
              <Route path="/" exact render={HomePage} />
              <Route path="/basket" component={BasketPage} />
              <Route path="/phones" exact render={props => <PhonesPage className="PhonePage" {...props} />} />
              <Route path="/phones/:idPhone" render={props => <PhoneDetailsPage {...props} />} />
              <Route render={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </Router>
    </BasketContext.Provider>
  )
}

export default App;
