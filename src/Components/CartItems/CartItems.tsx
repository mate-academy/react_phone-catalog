/* eslint-disable no-param-reassign */
import { useContext } from 'react';
import { Navigation } from '../Navigation/Navigation';
import cart from './CartItems.module.scss';
import { CatalogContext } from '../CatalogProvider';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../types/Product';
import { Footer } from '../Footer/Footer';

export const CartItems = () => {
  const {
    addedItems,
    setAddedItems,
    setTotalPrice,
    totalPrice,
    oldAddedItems,
    setTotalModels,
    totalModels,
    totalOldModels,
    totalOldProductsPrice,
    products,
    setProducts,
  } = useContext(CatalogContext);

  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className={cart.cartitems}>
        {addedItems.length === 0 && oldAddedItems.length === 0 ? (
          <>
            <h1 className={cart.cartitems__emptycarttitle}>
              Your cart is empty :)
            </h1>
            <div className={cart.cartitems__emptycardimage}></div>
          </>
        ) : (
          <>
            <button
              className={cart.cartitems__backbutton}
              onClick={() => navigate(-1)}
            >
              {'<'} Back
            </button>
            <h1 className={cart.cartitems__title}>Cart</h1>
            <div className={cart.cartitems__content}>
              {addedItems.length !== 0 && (
                <>
                  <h2 className={cart.cartitems__header}>New Products</h2>
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
                        const updateItem = addedItems.map(currentItem => {
                          if (currentItem.id === item.id) {
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

                        const updateProduct = products.map(currentProduct => {
                          if (item.id === currentProduct.id) {
                            return {
                              ...currentProduct,
                              amountOfModels:
                                currentProduct.amountOfModels + changer,
                            };
                          }

                          return currentProduct;
                        });

                        setTotalModels(totalModels + changer);
                        setAddedItems(updateItem);
                        setProducts(updateProduct);
                      }
                    };

                    return (
                      <div className={cart.cartitems__item} key={item.id}>
                        <div className={cart.cartitems__imagecontainer}>
                          <button
                            className={cart.cartitems__crossbutton}
                            onClick={() => deleteItem(item)}
                          ></button>
                          <Link to={`/${item.category}/${item.itemId}`}>
                            <img
                              src={item.image}
                              alt=""
                              className={cart.cartitems__image}
                            />
                          </Link>
                          <h2 className={cart.cartitems__name}>{item.name}</h2>
                        </div>
                        <div className={cart.cartitems__pricecontainer}>
                          {' '}
                          <button
                            className={classNames(
                              [cart.cartitems__buttondecreased],
                              {
                                [cart.cartitems__buttondecreaseddisabled]:
                                  item.amountOfModels === 1,
                              },
                            )}
                            onClick={() => changeAmountOfModels(item.id, -1)}
                            disabled={item.amountOfModels === 1}
                          >
                            -
                          </button>
                          <span className={cart.cartitems__amountofmodels}>
                            {item.amountOfModels}
                          </span>
                          <button
                            className={classNames(
                              [cart.cartitems__buttonincreased],
                              {
                                [cart.cartitems__buttonincreaseddisabled]:
                                  item.amountOfModels === 10,
                              },
                            )}
                            onClick={() => changeAmountOfModels(item.id, 1)}
                            disabled={item.amountOfModels === 10}
                          >
                            +
                          </button>
                          <span
                            className={cart.cartitems__price}
                          >{`$${item.price}`}</span>
                        </div>
                      </div>
                    );
                  })}
                  {addedItems.length !== 0 && (
                    <div className={cart.cartitems__summary}>
                      <div
                        className={cart.cartitems__summaryprice}
                      >{`Total price for new products: $${totalPrice}`}</div>
                      <div
                        className={cart.cartitems__summarytotal}
                      >{`You have ${totalModels} new ${totalModels === 1 ? 'product' : 'products'}`}</div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className={cart.cartitems__total}>
              <div
                className={cart.cartitems__totalprice}
              >{`$${totalPrice + totalOldProductsPrice}`}</div>
              <div
                className={cart.cartitems__allproducts}
              >{`Total for ${totalModels + totalOldModels} items`}</div>
              <div className={cart.cartitemline}></div>
              <button className={cart.cartitems__checkoutbutton}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
