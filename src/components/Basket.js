import React from 'react';
import url from './url';

const Basket = ({ cart, setCart }) => {
  const changeValue = (event, id) => {
    switch (event.target.value) {
      case 'plus':
        setCart(cart.map(item => (
          id === item.id
            ? { ...item, count: item.count + 1 }
            : { ...item }
        )));
        break;
      case 'minus':
        setCart(cart.map(item => (
          id === item.id
            ? { ...item, count: item.count - 1 }
            : { ...item }
        )));
        break;
      default:
        setCart(cart.map(item => (
          id === item.id
            ? { ...item, count: event.target.value }
            : { ...item }
        )));
    }
  };

  const deleteItem = (id) => {
    setCart(cart.filter(item => id !== item.id));
  };

  return (
    <ul>
      {
        cart.map(item => (
          <li key={item.id}>
            <img src={url + item.imageUrl} alt="" />
            <h2>{item.name}</h2>
            <p>{item.snippet}</p>
            <button
              onClick={event => changeValue(event, item.id)}
              value="minus"
            >
              -
            </button>
            <input
              type="number"
              value={item.count}
              onChange={event => changeValue(event, item.id)}
            />
            <button
              onClick={event => changeValue(event, item.id)}
              value="plus">
              +
            </button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))
      }
    </ul>
  );
};

export default Basket;
