/* eslint-disable no-param-reassign */
import { useContext, useState } from 'react';
import { Navigation } from '../Navigation/Navigation';
import cart from './CartItems.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../types/Product';
import { Footer } from '../Footer/Footer';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';

export const CartItems = () => {
  const {
    addedItems,
    setAddedItems,
    setTotalPrice,
    totalPrice,
    setTotalModels,
    totalModels,
    products,
    setProducts,
    setFavouriteItems,
    themeSwitcher,
    error,
  } = useContext(CatalogContext);

  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <Navigation />
      {!error ? (
        <div
          className={cart.cartitems}
          data-theme={themeSwitcher ? 'dark' : 'light'}
        >
          {addedItems.length === 0 ? (
            <>
              <h1 className={cart.emptycarttitle}>Your cart is empty :)</h1>
              <div
                className={classNames([cart.emptycartimage], {
                  [cart.emptycartimageONDARK]: themeSwitcher,
                })}
              ></div>
            </>
          ) : (
            <>
              {checkout ? (
                <div
                  className={classNames([cart.checkout], {
                    [cart.checkoutONDARK]: themeSwitcher,
                  })}
                >
                  <h1 className={cart.question}>
                    Checkout is not implemented yet. Do you want to clear the
                    Cart?
                  </h1>
                  <div className={cart.options}>
                    <button
                      className={cart.option}
                      onClick={() => {
                        setCheckout(false);
                        localStorage.clear();
                        window.location.reload();
                      }}
                    >
                      CONFIRM
                    </button>
                    <button
                      className={cart.option}
                      onClick={() => setCheckout(false)}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className={cart.backbutton}
                    onClick={() => navigate(-1)}
                  >
                    {'<'} Back
                  </button>
                  <h1 className={cart.title}>Cart</h1>
                  <div className={cart.container}>
                    <div className={cart.content}>
                      {addedItems.length !== 0 && (
                        <>
                          {addedItems.map(item => {
                            const deleteItem = (deletedItem: Product) => {
                              if (deletedItem.id === item.id) {
                                const updateItem = addedItems.filter(
                                  currentItem =>
                                    currentItem.id !== deletedItem.id,
                                );

                                setAddedItems(updateItem);
                                setTotalPrice(
                                  totalPrice -
                                    deletedItem.amountOfModels *
                                      deletedItem.price,
                                );
                                setTotalModels(
                                  totalModels - deletedItem.amountOfModels,
                                );
                              }

                              return item;
                            };

                            const changeAmountOfModels = (
                              itemId: string,
                              changer: 1 | -1,
                            ) => {
                              if (itemId === item.id) {
                                const updateItem = addedItems.map(
                                  currentItem => {
                                    if (currentItem.id === item.id) {
                                      setTotalPrice(
                                        totalPrice +
                                          currentItem.price * changer,
                                      );

                                      return {
                                        ...currentItem,
                                        amountOfModels:
                                          currentItem.amountOfModels + changer,
                                      };
                                    }

                                    return currentItem;
                                  },
                                );

                                const updateFavourites = addedItems.map(
                                  currentItem => {
                                    if (currentItem.id === item.id) {
                                      setTotalPrice(
                                        totalPrice +
                                          currentItem.price * changer,
                                      );

                                      return {
                                        ...currentItem,
                                        amountOfModels:
                                          currentItem.amountOfModels + changer,
                                      };
                                    }

                                    return currentItem;
                                  },
                                );

                                const updateProduct = products.map(
                                  currentProduct => {
                                    if (item.id === currentProduct.id) {
                                      return {
                                        ...currentProduct,
                                        amountOfModels:
                                          currentProduct.amountOfModels +
                                          changer,
                                      };
                                    }

                                    return currentProduct;
                                  },
                                );

                                setTotalModels(totalModels + changer);
                                setFavouriteItems(updateFavourites);
                                setAddedItems(updateItem);
                                setProducts(updateProduct);
                              }
                            };

                            return (
                              <div className={cart.item} key={item.id}>
                                <div className={cart.imagecontainer}>
                                  <button
                                    className={cart.crossbutton}
                                    onClick={() => deleteItem(item)}
                                  ></button>
                                  <Link to={`/${item.category}/${item.itemId}`}>
                                    <img
                                      src={item.image}
                                      alt=""
                                      className={cart.image}
                                    />
                                  </Link>
                                  <h2 className={cart.name}>{item.name}</h2>
                                </div>
                                <div className={cart.pricecontainer}>
                                  {' '}
                                  <button
                                    className={classNames(
                                      [cart.button__decreased],
                                      {
                                        [cart.button__decreased_disabled]:
                                          item.amountOfModels === 1,
                                      },
                                    )}
                                    onClick={() =>
                                      changeAmountOfModels(item.id, -1)
                                    }
                                    disabled={item.amountOfModels === 1}
                                  >
                                    -
                                  </button>
                                  <span className={cart.amountofmodels}>
                                    {item.amountOfModels}
                                  </span>
                                  <button
                                    className={classNames(
                                      [cart.button__increased],
                                      {
                                        [cart.button__increased_disabled]:
                                          item.amountOfModels === 10,
                                      },
                                    )}
                                    onClick={() =>
                                      changeAmountOfModels(item.id, 1)
                                    }
                                    disabled={item.amountOfModels === 10}
                                  >
                                    +
                                  </button>
                                  <span
                                    className={cart.price}
                                  >{`$${item.price}`}</span>
                                </div>
                              </div>
                            );
                          })}
                          {addedItems.length !== 0 && (
                            <div className={cart.summary}>
                              <div
                                className={cart.summaryprice}
                              >{`Total price for new products: $${totalPrice}`}</div>
                              <div
                                className={cart.summarytotal}
                              >{`You have ${totalModels} new ${totalModels === 1 ? 'product' : 'products'}`}</div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className={cart.total}>
                      <div className={cart.totalprice}>{`$${totalPrice}`}</div>
                      <div
                        className={cart.allproducts}
                      >{`Total for ${totalModels} items`}</div>
                      <div className={cart.cartitemline}></div>
                      <button
                        className={cart.checkoutbutton}
                        onClick={() => setCheckout(true)}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <ErrorScreen />
      )}

      <Footer />
    </>
  );
};
