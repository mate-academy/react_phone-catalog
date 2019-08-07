import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './basket.css';

const Basket = ({ history }) => {
  const currentBuy = localStorage.buy
    && localStorage.buy
      .split('&')
      .map(item => item.split('*'));

  const deleteItem = (id) => {
    let newBuy = currentBuy.filter(item => item[0] !== id);

    localStorage.removeItem(id);

    if (newBuy.length !== 0) {
      newBuy = newBuy.map(item => item.join('*')).join('&');
      localStorage.setItem('buy', newBuy);
    } else {
      localStorage.removeItem('buy');
    }

    history.replace(history.location);
  };

  const increase = (id) => {
    let newBuy = [...currentBuy];
    const index = currentBuy.indexOf(id);

    newBuy[index] = [id[0], +id[1] + 1];

    newBuy = newBuy.map(item => item.join('*')).join('&');

    localStorage.setItem('buy', newBuy);

    history.replace(history.location);
  };

  const decrease = (id) => {
    let newBuy = [...currentBuy];
    const index = currentBuy.indexOf(id);

    if (+id[1] - 1 !== 0) {
      newBuy[index] = [id[0], +id[1] - 1];

      newBuy = newBuy.map(item => item.join('*')).join('&');

      localStorage.setItem('buy', newBuy);

      history.replace(history.location);
    } else {
      deleteItem(id[0]);
    }
  };

  return (
    <div className="basket">
      <ul className="basket__list">
        {
          currentBuy
            ? currentBuy.map((item, index) => (
              <li className="basket__list--item">
                <div>
                  <span>
                    {`${index + 1}.  `}
                  </span>

                  <Link
                    to={`/phones/${item[0]}`}
                    className=""
                  >
                    {localStorage[item[0]]}
                  </Link>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => increase(item)}
                  >
                    +
                  </button>

                  <input
                    className="basket__count"
                    value={item[1]}
                  />

                  <button
                    type="button"
                    onClick={() => decrease(item)}
                  >
                    -
                  </button>

                  <button
                    className="basket__delete"
                    type="button"
                    onClick={() => deleteItem(item[0])}
                  >
                    x
                  </button>
                </div>
              </li>
            ))
            : (
              <div className="basket__empty">
                Basket is empty
              </div>
            )
        }
      </ul>
    </div>
  );
};

Basket.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

export default Basket;
