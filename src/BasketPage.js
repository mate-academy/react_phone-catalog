import React, { useContext } from 'react';
import { BasketContext } from './App';
import { Link } from 'react-router-dom';

const BasketPage = () => {
  const { items, handleClickClear, handleClickChangeCount } = useContext(BasketContext);
  console.log(items);
  if (items.length < 1) {
    return (
      <>
        <h1 className="greatings-header">Basket is empty, <Link className="link-to-phones" to={`phones`}><span>explore phones</span></Link></h1>
      </>
    )
  } else {

    return (
      <>
        <div className="basket-items-group">
          {items.map((item, index) => (
            <div className="basket-item-container">
              <Link to={`phones/${item.id}`} >
              <img src={`${item.imageUrl}`}
                className="product-image-basket"
                alt={item.id}
              />
              </Link>
              <div>
                <h3>{item.id}</h3>
                <p className="basket-count">Count:</p>
                <img onClick={() => handleClickChangeCount("up", index)} src="img/icos/menu-up-outline.png" />
                <div className="items-counter">{item.count}</div>
                <img onClick={() => handleClickChangeCount("down", index)} src="img/icos/menu-down-outline.png" />
              </div>
              <img onClick={() => handleClickClear(index)} className="close-button" src="img/icos/close.svg" />
            </div>
          ))}

        </div>
      </>
    )
  }
}

export default BasketPage;
