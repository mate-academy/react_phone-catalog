import React, { useState } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/homePage/HomePage';
import PhonesPage from './components/phonesPage/PhonesPage';
import Basket from './components/basket/Basket';

const App = () => {
  const [basketList, setBasketList] = useState([]);

  const AddPhoneToBasketList = (phone) => {
    const basketItem = basketList.find(item => item.id === phone.id);

    if (basketItem) {
      basketItem.quantity += 1;
      setBasketList([...basketList]);
    } else {
      const newItem = { id: phone.id, quantity: 1, phone };

      setBasketList([...basketList, newItem]);
    }
  };

  const increaseQuantity = (event) => {
    const { target } = event;
    const basketItem = basketList.find(item => item.id === target.dataset.id);

    basketItem.quantity += 1;
    setBasketList([...basketList]);
  };

  const reduceQuantity = (event) => {
    const { target } = event;
    const basketItem = basketList.find(item => item.id === target.dataset.id);

    basketItem.quantity = basketItem.quantity > 0 ? basketItem.quantity - 1 : 0;
    setBasketList([...basketList]);
  };

  const removeItem = (event) => {
    const { target } = event;
    const itemIndex = basketList.findIndex(item => item.id === target.dataset.id);

    basketList.splice(itemIndex, 1);
    setBasketList([...basketList]);
  };

  return (
    <div className="App">
      <nav className="nav">
        <div className="nav__links">
          <NavLink exact to="/" className="nav__link">Home</NavLink>
          <NavLink to="/phones" className="nav__link">Phones</NavLink>
          <NavLink to="/basket" className="nav__link">Basket</NavLink>
        </div>
      </nav>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/phones" render={() => <PhonesPage AddPhoneToBasketList={AddPhoneToBasketList} />} />
        <Route path="/basket" render={() => <Basket
          basketList={basketList}
          increaseQuantity={increaseQuantity}
          reduceQuantity={reduceQuantity}
          removeItem={removeItem}
        />}
        />
        <Route render={() => <h1 className="pageNotFoundHeader">Sorry, page not found</h1>} />
      </Switch>
    </div>
  )
};

export default App;
