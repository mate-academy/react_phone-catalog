import React from 'react';
import { IGood } from '../../provider/dataFromApi';
import { Link } from 'react-router-dom';
//import { API_URL } from '../../env';
import './GoodList.scss';

type Props = { goods: IGood[] }

export const GoodList: React.FC<Props> = (prop) => {

  return (
    <div >
      <h1 className="block__title"> Hot prices</h1>
      <div className="Card">
        <ul className="Card__list">
          {prop.goods.map(({ id, name, imageUrl, price, discount, screen, capacity, ram }) => (
            <li
              className="Card__item"
              key={id} >
                            <div>
                <img
                  src={`./${imageUrl}`}
                  alt={name}
                  className="Card__img"
                />
                <h3>{name}</h3>
                <div className="price__wrapper">
                  <span> $ {`${price - (price * discount / 100)}`}</span>
                  <span> $ {price}</span>
                </div>
                <ul className="Card__parameters">
                  <li>screen: {screen}</li>
                  <li>capacity: {capacity}</li>
                  <li>ram: {ram}</li>
                </ul>
              </div>
              <div className="cartFavourites__wrapper">
                <button className="btn__addToCart" >
                  <Link to="#" >Add to cart</Link>
                </button>
                <button className="btn__favourites">
                  <Link to="#" >heart</Link>
                </button>
              </div>
            </li>
          )
          )}
        </ul>
      </div>
    </div>
  )
}
