import React, { useContext } from 'react';
import { BasketContext } from './App';

const BasketPage = () => {
  const { items, handleClickClear, handleClickChangeCount } = useContext(BasketContext);
  console.log(items);
  return (
    <>
      <div className="basket-items-group">
        {items.map((item, index) => (
          <div className="basket-item-container">

            <img src={`/${item.imageUrl}`}
              className="product-image-basket"
              alt={item.id}
            />
            <div>
              <h3>{item.id}</h3>
              <p className="basket-count">Count:</p>
              <img onClick={() =>handleClickChangeCount("up", index)} src="/img/icos/menu-up-outline.png" />
              <div className="items-counter">{item.count}</div>
              <img onClick={() =>handleClickChangeCount("down", index)} src="/img/icos/menu-down-outline.png" />
            </div>
            <img onClick={() =>handleClickClear(index)} className="close-button" src="/img/icos/close.svg" />
          </div>
        ))}

      </div>
    </>
  )
}

export default BasketPage;
