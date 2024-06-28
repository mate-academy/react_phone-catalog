import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftGrayImg,
  closeImg,
  minusImg,
  plusImg,
} from '../../utils/indes';
import { StateProduct } from '../../context/ProductContext';
import { UpgradedProduct } from '../../types/UpgradedProduct';

import './CartPage.scss';
import classNames from 'classnames';

const CartPage = () => {
  const { localStorage, handleAction } = useContext(StateProduct);
  const [message, setMessage] = useState(false);

  const products = [...localStorage].filter(product => product.addedToCart);

  const totalCartPrice = products.reduce(
    (prev, acc) => prev + acc.price * acc.quantity,
    0,
  );

  const totalCartQuantity = products.reduce(
    (prev, acc) => prev + acc.quantity,
    0,
  );

  const removeProduct = (product: UpgradedProduct) => {
    handleAction(product, 'remove');
  };

  const minusQuantity = (product: UpgradedProduct) => {
    handleAction(product, 'minusQuantity');
  };

  const plusQuantity = (product: UpgradedProduct) => {
    handleAction(product, 'plusQuantity');
  };

  const handleShowMessage = () => {
    setMessage(!message);
  };

  return (
    <div className="cartPage">
      <div className="cartPage__block">
        <div className="cartPage__navigation">
          <Link to=".." className="cartPage__navigation-link">
            <img src={ArrowLeftGrayImg} alt="AroowLeft" />
          </Link>
          <Link to=".." className="cartPage__navigation-link">
            <p className="cartPage__navigation-title">{'Back'}</p>
          </Link>
        </div>

        {products.length ? (
          <>
            <div className="cartPage__top">
              <h1 className="cartPage__top-title">Cart</h1>
            </div>

            <div className="cartPage__contant">
              <div className="cartPage__items">
                {products.map(product => {
                  const { itemId, name, image, quantity, price } = product;
                  const fullPrice = price * quantity;

                  return (
                    <div key={itemId} className="cartPage__item">
                      <div className="cartPage__item-firstRow">
                        <button
                          className="cartPage__item-btnRemove"
                          type="button"
                          onClick={() => removeProduct(product)}
                        >
                          <img
                            src={closeImg}
                            alt="Delate"
                            className="cartPage__item-btnRemove-img"
                          />
                        </button>
                        <div className="cartPage__item-images">
                          <img
                            src={image}
                            alt={name}
                            className="cartPage__item-images-img"
                          />
                        </div>
                        <div className="cartPage__item-title">{name}</div>
                      </div>

                      <div className="cartPage__item-secondRow">
                        <div className="cartPage__item-btn">
                          <button
                            type="button"
                            onClick={() => minusQuantity(product)}
                            disabled={quantity === 1}
                            className={classNames(
                              'cartPage__item-btn-quantity',
                              {
                                ['cartPage__item-btn-quantity-isDisabled']:
                                  quantity === 1,
                              },
                            )}
                          >
                            <img
                              src={minusImg}
                              alt="minus"
                              className={classNames(
                                'cartPage__item-btn-image',
                                {
                                  ['cartPage__item-btn-image-isDisabled']:
                                    quantity === 1,
                                },
                              )}
                            />
                          </button>

                          <p className="cartPage__item-btn-count">{quantity}</p>
                          <button
                            type="button"
                            onClick={() => plusQuantity(product)}
                            className="cartPage__item-btn-quantity"
                          >
                            <img src={plusImg} alt="plus" />
                          </button>
                        </div>
                        <h3 className="cartPage__item-price">{`$${fullPrice}`}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cartPage__tottal">
                <div className="cartPage__tottal-block">
                  <div>
                    <h2 className="cartPage__tottal-price">{`$${totalCartPrice}`}</h2>
                    <p className="cartPage__tottal-items">
                      {totalCartQuantity === 1
                        ? `Total for ${totalCartQuantity} item`
                        : `Total for ${totalCartQuantity} items`}
                    </p>
                  </div>
                  <div className="cartPage__tottal-line" />
                  <button
                    className="cartPage__tottal-btn"
                    type="button"
                    onClick={handleShowMessage}
                  >
                    Checkout
                  </button>
                  {message && (
                    <p className="cartPage__tottal-message">Try later</p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1 className="cartPage__message">Cart is empty</h1>
        )}
      </div>
    </div>
  );
};

export default CartPage;
