/* eslint-disable @typescript-eslint/ban-ts-comment */
import './CartPage.scss';
import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavigationPath } from '../../NavigationPath';
import { CatalogContext } from '../../../context/CatalogContext';
import { Link } from 'react-router-dom';
import { images } from '../../../images';
import { ScrollBackToTop } from '../../../utils/scrollWindowTop';

export const CartPage: React.FC = () => {
  useEffect(() => {
    document.title = `Cart - Nice Gadgets (UA)`;
  }, []);

  const { cartProducts, deleteFromCart, setCartProducts } =
    useContext(CatalogContext);

  const [showCheckout, setShowCheckout] = useState(false);

  const handleAddProductQuantity = (productId: number) => {
    setCartProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }

        return product;
      });
    });
  };

  const handleDeleteQuantity = (productId: number) => {
    setCartProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }

        return product;
      });
    });
  };

  useEffect(() => {
    setShowCheckout(false);
  }, []);

  const handleDeleteClick = useCallback(
    (itemId: number) => {
      const productElement = document.querySelector(
        `.product[data-item-id="${itemId}"]`,
      );

      if (productElement) {
        productElement.classList.toggle('hidden');
      }

      setTimeout(() => {
        deleteFromCart(itemId);
      }, 300);
    },
    [deleteFromCart],
  );

  const handleClearCart = () => {
    setCartProducts([]);
    setShowCheckout(false);
  };

  useEffect(() => {
    const handleScrollAndOverflow = () => {
      if (showCheckout) {
        ScrollBackToTop();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleScrollAndOverflow();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCheckout]);

  return (
    <main className="cartPage container">
      <div className="cartPage__titleBlock">
        <NavigationPath />
        {cartProducts.length === 0 ? (
          <>
            <h1 className="cartPage__titleBlock--title">Your cart is empty</h1>
            <div className="cartPage__titleBlock--image-block">
              <img
                src={images.cartIsEmpty}
                alt="cartEmpty"
                className="cartPage__titleBlock--image"
              />
            </div>
          </>
        ) : (
          <h1 className="cartPage__titleBlock--title">Cart</h1>
        )}
      </div>

      {cartProducts.length !== 0 && (
        <div className="cartPage__block">
          <div className="cartPage__productsBlock">
            {cartProducts.map(product => {
              const { image, id, name, price, quantity, category, itemId } =
                product;

              return (
                <div
                  key={id}
                  className="cartPage__productBlock--product product"
                  data-item-id={id}
                >
                  <div className="product__top">
                    <div className="product__top--leftBlock">
                      <button
                        onClick={() => handleDeleteClick(id)}
                        className="product__button"
                      >
                        <img
                          className="product__button--image"
                          src={images.closeImg}
                          alt="close"
                        />
                      </button>
                      <Link to={`/${category}/${itemId}`}>
                        <img
                          className="product__image"
                          src={image}
                          alt="productImg"
                        />
                      </Link>
                    </div>
                    <Link
                      to={`/${category}/${itemId}`}
                      className="bodyText product__name"
                    >
                      {name}
                    </Link>
                  </div>
                  <div className="product__bottom">
                    <div className="product__numBlock">
                      <button
                        onClick={() => handleDeleteQuantity(id)}
                        className={classNames('product__numBlock--button', {
                          'product__numBlock--button-unActive': quantity === 1,
                        })}
                      >
                        <img src={images.minus} alt="minusProduct" />
                      </button>
                      <span className="bodyText product__numBlock--quantity">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleAddProductQuantity(id)}
                        className="product__numBlock--button"
                      >
                        <img src={images.plus} alt="plusProduct" />
                      </button>
                    </div>
                    <h3 className="product__numBlock--price">{`$${price}`}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cartPage__priceBlock">
            <h2 className="cartPage__priceBlock--price">
              {`$${cartProducts.reduce((sum, { price, quantity }) => sum + price * quantity, 0)}`}
            </h2>
            <span className="bodyText cartPage__priceBlock--counter">
              {`Total for ${cartProducts.length} items`}
            </span>
            <button
              onClick={() => setShowCheckout(true)}
              className="cartPage__priceBlock--button buttons"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {showCheckout && (
        <>
          <div className="checkout"></div>
          <div className="checkout__container">
            <div className="checkout__block">
              <h2>
                Checkout is not implemented yet. Do you want to clear the Cart?
              </h2>
              <div className="checkout__buttons">
                <button
                  className="checkout__buttons--button bodyText"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button
                  className="checkout__buttons--button bodyText"
                  onClick={() => setShowCheckout(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
