/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { Navigation } from '../Navigation/Navigation';
import './CartItems.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../types/Product';
import { Footer } from '../Footer/Footer';
import { OldProduct } from '../types/OldProducts';

export const CartItems = () => {
  const {
    addedItems,
    setAddedItems,
    setTotalPrice,
    totalPrice,
    oldAddedItems,
    setAmountOfModels,
    amountOfModels,
    setTotalModels,
    totalModels,
    setOldAddedItems,
    amountOfOldModels,
    setAmountOfOldModels,
    totalOldModels,
    setTotalOldModels,
    totalOldProductsPrice,
    setTotalOldProductsPrice,
  } = useContext(CatalogContext);

  return (
    <>
      <Navigation />
      <div className="cartitems">
        {addedItems.length === 0 && oldAddedItems.length === 0 ? (
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
              {addedItems.length !== 0 && (
                <>
                  <h2 className="cartitems__header">New Products</h2>
                  {addedItems.map(item => {
                    const deleteItem = (deletedItem: Product) => {
                      if (deletedItem.id === item.id) {
                        const updateItem = addedItems.filter(
                          currentItem => currentItem.id !== deletedItem.id,
                        );

                        setAddedItems(updateItem);
                        setTotalPrice(
                          totalPrice - amountOfModels * deletedItem.price,
                        );
                        setTotalModels(totalModels - amountOfModels);
                        setAmountOfModels(1);
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
                            setTotalPrice(
                              totalPrice + currentItem.price * changer,
                            );

                            return {
                              ...currentItem,
                              amountOfModels:
                                currentItem.amountOfModels + changer,
                            };
                          }

                          return currentItem;
                        });

                        setTotalModels(totalModels + changer);
                        setAmountOfModels(item.amountOfModels + changer);
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
                            className={classNames(
                              'cartitems__button--decreased',
                              {
                                'cartitems__button--decreased--disabled':
                                  item.amountOfModels === 1,
                              },
                            )}
                            onClick={() => changeAmountOfModels(item.id, -1)}
                            disabled={item.amountOfModels === 1}
                          >
                            -
                          </button>
                          <span className="cartitems__amount-of-models">
                            {item.amountOfModels}
                          </span>
                          <button
                            className={classNames(
                              'cartitems__button--increased',
                              {
                                'cartitems__button--increased--disabled':
                                  item.amountOfModels === 10,
                              },
                            )}
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
                  {addedItems.length !== 0 && (
                    <div className="cartitems__summary">
                      <div className="cartitems__summary--price">{`Total price for new products: $${totalPrice}`}</div>
                      <div className="cartitems__summary--total">{`You have ${totalModels} new ${totalModels === 1 ? 'product' : 'products'}`}</div>
                    </div>
                  )}
                </>
              )}
              {oldAddedItems.length !== 0 && (
                <>
                  <h2 className="cartitems__header">Old Products</h2>
                  {oldAddedItems.map(oldItem => {
                    const deleteOldItem = (deletedOldItem: OldProduct) => {
                      if (deletedOldItem.id === oldItem.id) {
                        const updateItem = oldAddedItems.filter(
                          currentItem => currentItem.id !== deletedOldItem.id,
                        );

                        setOldAddedItems(updateItem);
                        setTotalOldProductsPrice(
                          totalOldProductsPrice -
                            amountOfOldModels * deletedOldItem.price,
                        );
                        setTotalOldModels(totalOldModels - amountOfOldModels);
                        setAmountOfOldModels(1);
                      }

                      return oldItem;
                    };

                    const changeAmountOfOldModels = (
                      oldItemId: string,
                      changer: 1 | -1,
                    ) => {
                      if (oldItemId === oldItem.id) {
                        const updateItem = oldAddedItems.map(currentItem => {
                          if (currentItem.id === oldItemId) {
                            setTotalOldProductsPrice(
                              totalOldProductsPrice +
                                currentItem.price * changer,
                            );

                            return {
                              ...currentItem,
                              amountOfModels:
                                currentItem.amountOfModels + changer,
                            };
                          }

                          return currentItem;
                        });

                        setTotalOldModels(totalOldModels + changer);
                        setAmountOfOldModels(oldItem.amountOfModels + changer);
                        setOldAddedItems(updateItem);
                      }
                    };

                    return (
                      <div className="cartitems__item" key={oldItem.id}>
                        <div className="cartitems__image-container">
                          <button
                            className="cartitems__cross-button"
                            onClick={() => deleteOldItem(oldItem)}
                          ></button>
                          <Link to={`/oldPhones/${oldItem.id}`}>
                            <img
                              src={oldItem.imageUrl}
                              alt=""
                              className="cartitems__image"
                            />
                          </Link>
                          <h2 className="cartitems__name">{oldItem.name}</h2>
                        </div>
                        <div className="cartitems__price-container">
                          {' '}
                          <button
                            className={classNames(
                              'cartitems__button--decreased',
                              {
                                'cartitems__button--decreased--disabled':
                                  oldItem.amountOfModels === 1,
                              },
                            )}
                            onClick={() =>
                              changeAmountOfOldModels(oldItem.id, -1)
                            }
                            disabled={oldItem.amountOfModels === 1}
                          >
                            -
                          </button>
                          <span className="cartitems__amount-of-models">
                            {oldItem.amountOfModels}
                          </span>
                          <button
                            className={classNames(
                              'cartitems__button--increased',
                              {
                                'cartitems__button--increased--disabled':
                                  oldItem.amountOfModels === 10,
                              },
                            )}
                            onClick={() =>
                              changeAmountOfOldModels(oldItem.id, 1)
                            }
                            disabled={oldItem.amountOfModels === 10}
                          >
                            +
                          </button>
                          <span className="cartitems__price">{`$${oldItem.price}`}</span>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {oldAddedItems.length !== 0 && (
                <div className="cartitems__summary">
                  <div className="cartitems__summary--text">
                    Total price for old products:{' '}
                    <span className="cartitems__summary--price">
                      {`$${totalOldProductsPrice}`}
                    </span>
                  </div>
                  <div className="cartitems__summary--total">{`You have ${totalOldModels} old ${totalOldModels === 1 ? 'product' : 'products'}`}</div>
                </div>
              )}
            </div>
            <div className="cartitems__total">
              <div className="cartitems__total-price">{`$${totalPrice + totalOldProductsPrice}`}</div>
              <div className="cartitems__all-products">{`Total for ${totalModels + totalOldModels} items`}</div>
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
