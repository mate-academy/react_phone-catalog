import React from 'react';
import { useSelector } from 'react-redux';
import { getProducts } from '../store/index';
import './Favourites.scss';
import { CardItem } from './CardItem';

export const CardPage = () => {
  const products = useSelector(getProducts);
  // const productsInCart = products.filter((product: Products) => product.toCard);

  return (
    <>
      {products.length === 0 ? <h1>No items in cart</h1> : (
        <section className="section">
          <div className="container">
            <h1 className="PhonesPage__head">
              Cart
            </h1>
            <div className="Card">
              <div className="Card__items">
                {products.map((product: Products) => (
                  <CardItem cardItem={product} />
                ))}
              </div>
              <div className="Card__total total">
                <h1 className="total__price">$1233</h1>
                <p className="total__items">Total for 3 items</p>
                <div className="line" style={{ height: '1px', width: '100%', backgroundColor: '#E2E6E9' }} />
                <button className="total__button" type="button">Checkout</button>
              </div>
            </div>
          </div>
        </section>

      )}


    </>
  );
};
