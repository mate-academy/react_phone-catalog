/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { Navigation } from '../Navigation/Navigation';
import './CartItems.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../types/Product';
import { Footer } from '../Footer/Footer';

export const CartItems = () => {
  const { addedItems, setAddedItems, setTotalPrice, totalPrice } =
    useContext(CatalogContext);

  return (
    <>
      <Navigation />
      <div className="cartitems">
        {addedItems.length === 0 ? (
          <>
            <h1 className="cartitems__empty-card--title">
              Your cart is empty :)
            </h1>
            <div className="cartitems__empty-card--image"></div>
          </>
        ) : (
          <>
            <button className="cartitems__back-button"> {'<'} Back</button>
            <h1 className="cartitems__title">Cart</h1>
            <div className="cartitems__content">
              {addedItems.map(item => {
                const deleteItem = (deletedItem: Product) => {
                  if (deletedItem.id === item.id) {
                    const updateItem = addedItems.filter(
                      currentItem => currentItem.id !== deletedItem.id,
                    );

                    setAddedItems(updateItem);
                    setTotalPrice(
                      totalPrice -
                        deletedItem.amountOfModels * deletedItem.price,
                    );
                  }

                  return item;
                };

                const changeAmountOfModels = (
                  itemId: string,
                  changer: 1 | -1,
                ) => {
                  if (itemId === item.id) {
                    const updateItem = addedItems.map(currentItem => {
                      if (currentItem.id === itemId) {
                        setTotalPrice(totalPrice + currentItem.price * changer);

                        return {
                          ...currentItem,
                          amountOfModels: currentItem.amountOfModels + changer,
                        };
                      }

                      return currentItem;
                    });

                    setAddedItems(updateItem);
                  }
                };

                return (
                  <div className="cartitems__item" key={item.id}>
                    <div className="cartitems__image-container">
                      <button
                        className="cartitems__cross-button"
                        onClick={() => deleteItem(item)}
                      ></button>
                      <Link to={`/${item.category}/${item.itemId}`}>
                        <img
                          src={item.image}
                          alt=""
                          className="cartitems__image"
                        />
                      </Link>
                      <h2 className="cartitems__name">{item.name}</h2>
                    </div>
                    <div className="cartitems__price-container">
                      {' '}
                      <button
                        className={classNames('cartitems__button--decreased', {
                          'cartitems__button--decreased--disabled':
                            item.amountOfModels === 1,
                        })}
                        onClick={() => changeAmountOfModels(item.id, -1)}
                        disabled={item.amountOfModels === 1}
                      >
                        -
                      </button>
                      <span className="cartitems__amount-of-models">
                        {item.amountOfModels}
                      </span>
                      <button
                        className={classNames('cartitems__button--increased', {
                          'cartitems__button--increased--disabled':
                            item.amountOfModels === 10,
                        })}
                        onClick={() => changeAmountOfModels(item.id, 1)}
                        disabled={item.amountOfModels === 10}
                      >
                        +
                      </button>
                      <span className="cartitems__price">{`$${item.price}`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cartitems__total">
              <div className="cartitems__total-price">{`$${totalPrice}`}</div>
              <div className="cartitems__all-products">Total for 3 items</div>
              <div className="cartitems__line"></div>
              <button className="cartitems__checkout-button">Checkout</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
