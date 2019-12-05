import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BASE_URL } from '../components/constants';

const BasketPage = ({ itemsInBasket, basketManager }) => {
  console.log(itemsInBasket);


  return (
    <main className="wrapper__main basket">
      {
        itemsInBasket.length
          ? (
            <>
              <h2 className="basket__quantity-of-phones">Chosen phones: {itemsInBasket.length}</h2>
              <ul className="basket__phones-list">
                {
                  itemsInBasket.map(item => (
                    <li
                      className="basket-card"
                      key={item.id}>
                      <div className="basket-card__img-and-name-container">
                        <div className="basket-card__img-container">
                          <Link to={`/phones/${item.id}`}>
                            <img
                              className="basket-card__img"
                              src={`${BASE_URL}/${item.imageUrl}`}
                              alt={`img ${item.name} phone in basket`} />
                          </Link>
                        </div>
                        <h3>
                          <Link
                            className="link"
                            to={`/phones/${item.id}`}>
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="basket-card__buttons-container">
                        <button
                          onClick={() => basketManager(item.id, 'decrease')}
                          className={item.quantity <= 1
                            ? "button button--decrease-increase button--decrease-increase-disabled"
                            : "button button--decrease-increase button--decrease-increase-active"}
                        >-</button>
                        <p className="basket-card__quantity-of-phone">{item.quantity}</p>
                        <button
                          onClick={() => basketManager(item.id, 'increase')}
                          className="basket-card__increase-button button button--decrease-increase button--decrease-increase-active"
                        >+</button>
                        <button
                          onClick={() => basketManager(item.id, 'remove')}
                          className="button button--remove"
                        >x</button>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="basket__buttons">
                <button
                  onClick={() => basketManager(0, "removeAll")}
                  className="button button--delete-items">
                  Delete all items from basket</button>
                <Link
                  className="link link--back-to-catalog"
                  to="/phones"
                >Back to catalog</Link>
              </div>
            </>
          )
          : <>
            <h2 className="basket__quantity-of-phones">Chosen phones: {itemsInBasket.length}</h2>
            <Link
              className="link link--back-to-catalog"
              to="/phones"
            >Back to catalog</Link>
          </>
      }
    </main>
  )
};

BasketPage.propTypes = {
  itemsInBasket: PropTypes.arrayOf(PropTypes.object).isRequired,
  basketManager: PropTypes.func.isRequired,
};

export default BasketPage;
