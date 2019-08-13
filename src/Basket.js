import React, {useContext} from 'react';
import { BasketContext } from './App';

const Basket = () => {
    const { items } = useContext(BasketContext);

  return (
    <>
    <div className="basket-container">
    <img className="basket-image" src="img/icos/cart4.png" />
    {items.length >= 1 && <div className="basket-items"><span>{items.length}</span></div>}
    </div>
    </>
  )
}

export default Basket;
