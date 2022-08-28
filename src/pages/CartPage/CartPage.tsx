import { useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

import './CartPage.scss';
import { getSelectedCartSelector } from '../../store/selectors';
import {
  delFromCart,
  delQuantity,
  setQuantity,
} from '../../store/actions';

export const CartPage = () => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const selected = useSelector(getSelectedCartSelector);
  const [currentItems, setCurrentItems] = useState(selected.length);
  const totalArray: number[] = [];

  selected
    .forEach(item => totalArray
      .push(item.product.price * (1 - item.product.discount / 100)));

  const initialAmount = totalArray.reduce((a, x) => a + x, 0);
  const [totalMoney, setTotalMoney] = useState(initialAmount);

  const handlerMinus = (id: string) => {
    const currentproduct = selected.find(item => item.id === id);

    if (currentproduct) {
      dispatch(delQuantity({
        id,
        quantity: currentproduct?.quantity - 1,
        product: currentproduct.product,
      }));
    }
  };

  const handlerPlus = (id: string) => {
    const currentproduct = selected.find(item => item.id === id);

    if (currentproduct) {
      dispatch(setQuantity({
        id,
        quantity: currentproduct?.quantity + 1,
        product: currentproduct.product,
      }));
    }
  };

  const handlerDelete = (id: string) => {
    const delItem = selected.find(item => item.id === id);

    if (delItem) {
      dispatch(delFromCart(delItem));
      setTotalMoney(totalMoney
        - delItem.quantity * (delItem.product.price
          * (1 - delItem.product.discount / 100)));
      setCurrentItems(currentItems - delItem.quantity);
    }
  };

  const forRender = selected
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="cartpage">
      <Header />
      <div className="cartpage__container">
        <div className="cartpage__boxarrowback">
          <div className="cartpage__arrow--back" />
          <a
            href="/#/phones"
            className="cartpage__link"
            data-cy="backButton"
          >
            <div
              className="cartpage__namepage"
            >
              Back
            </div>
          </a>
        </div>

        <h1 className="cartpage__title">
          Cart
        </h1>
        {currentItems === 0
        && <p className="cartpage__reminder">The cart is empty!!!</p>}

        <div className="cartpage__boxleftright">
          <div className="cartpage__boxleft">

            <div className="cartpage__boxoneproduct">
              <ul className="cartpage__list">
                {forRender.map(item => (

                  <li
                    className="cartpage__itemlist"
                    key={item.id}
                  >
                    <div className="cartpage__boxcrossbutton">
                      <IconButton
                        onClick={() => {
                          handlerDelete(item.id);
                        }}
                      >
                        <div className="cartpage__cross" />
                      </IconButton>
                    </div>
                    <div className="cartpage__image">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />
                    </div>

                    <div className="cartpage__nameitem">
                      {item.product.name}
                    </div>

                    <div className="cartpage__boxplusminus">

                      <div className="cartpage__rectangle">
                        <IconButton
                          disabled={item.quantity === 1}
                          onClick={() => {
                            setTotalMoney(totalMoney
                              - (item.product.price
                              * (1 - item.product.discount / 100)));
                            handlerMinus(item.id);
                            setCurrentItems(currentItems - 1);
                          }}
                        >
                          <div className="cartpage__minus" />
                        </IconButton>
                      </div>

                      <div className="cartpage__textquontity">
                        {item.quantity }
                      </div>

                      <div className="cartpage__rectangle">
                        <IconButton
                          onClick={() => {
                            setTotalMoney(totalMoney
                            + (item.product.price
                              * (1 - item.product.discount / 100)));
                            handlerPlus(item.id);
                            setCurrentItems(currentItems + 1);
                          }}

                        >
                          <div className="cartpage__plus" />
                        </IconButton>
                      </div>

                    </div>
                    <div className="cartpage__boxworth">
                      <h2 className="cartpage__textworth">
                        {item.product.price
                        * (1 - item.product.discount / 100)}
                      </h2>
                    </div>

                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cartpage__boxright">
            <div className="cartpage__box-price-phone">
              <h2 className="cartpage__current-price">
                $
                { totalMoney }
              </h2>
            </div>

            <h2 className="cartpage__textcount">
              Total for
              {' '}
              {currentItems}
              {' '}
              items
            </h2>

            <div className="cartpage__divider" />

            <div className="cartpage__box-buttons">
              <button
                type="button"
                className={isPressed
                  // eslint-disable-next-line max-len
                  ? 'cartpage__checkout--pressed cartpage__text-checkout--pressed'
                  : 'cartpage__checkout'}
                onClick={() => {
                  setIsPressed(!isPressed);
                }}
              >
                {isPressed ? 'Done' : 'Checkout'}
              </button>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};
