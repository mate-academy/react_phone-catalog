import React, { useState } from 'react';
import './App.css';
import { NavLink, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Phones from './components/Phones';
import NotFound from './components/NotFound';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import Basket from './components/Basket';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (obj, event) => {
    event.preventDefault();

    if (cart.find(item => item.id === obj.id)) {
      setCart(cart.map((item) => (
        obj.id === item.id
          ? { ...item, count: item.count + 1 }
          : { ...item }
      )));
    } else {
      setCart([...cart, { ...obj, count: 1 }]);
    }

    return 0;
  };

  return (
    <div className="App">
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/phones">Phones</NavLink>
      <NavLink to="/basket">
        Cart
        {cart.length}
      </NavLink>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/phones"
          exact
          render={() => <Phones addToCart={addToCart} />}
        />
        <Route path="/phones/:phoneId" component={PhoneDetailsPage} />
        <Route
          path="/basket"
          render={() => <Basket cart={cart} setCart={setCart} />}
        />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
