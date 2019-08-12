import React from 'react';
import url from "./url";

const Basket = ({ cart }) => {
  console.log(cart);

  return (
    <ul>
      {
        cart.map(item => (
          <li key={item.id}>
            <img src={url + item.imageUrl} alt="" />
            <h2>{item.name}</h2>
            <p>{item.snippet}</p>
            <input type="number" value={item.count}/>
          </li>
        ))
      }
    </ul>
  );
}

export default Basket;
