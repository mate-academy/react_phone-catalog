import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../Components/BackButton';
import { CartContext } from '../../Components/Context/CartContextProvider';
import { Header } from '../../Components/Header';
import { BASE_URL } from '../../Helpers/api/api';
import { deductDiscount } from '../../Helpers/functions/deductDiscount';
import {
  parseStorage, setItemInStorage,
} from '../../Helpers/functions/storage-helpers';
import { findNavItem } from '../../Helpers/navItems';
import { Product } from '../../Helpers/types/Product';
import { StorageItem } from '../../Helpers/types/StorageItem';
import './CartPage.scss';

export const CartPage = () => {
  const parsedCartItems = parseStorage('CartItems');

  const { cart, setCart } = useContext(CartContext);
  const [notification, setNotification] = useState(false);
  const [products, setProducts] = useState(parsedCartItems);

  const [quantity, setQuantity] = useState(parsedCartItems.reduce(
    ((a: number, b: StorageItem) => a + b.quantity), 0,
  ));

  const [totalPrice, setTotalPrice] = useState(parsedCartItems.reduce(
    ((a: number, b: StorageItem) => {
      return a + b.quantity * deductDiscount(b.product);
    }),
    0,
  ));

  const saveQuantity = (value: number, product: Product, itemQty: number) => {
    setQuantity(value);

    if (quantity < value) {
      setTotalPrice(totalPrice + deductDiscount(product));
      setCart(cart + 1);
    } else if (quantity > value) {
      setTotalPrice(totalPrice - deductDiscount(product));
      setCart(cart - 1);
    }

    const parsedItems = parseStorage('CartItems');
    const itemsWithUpdatedQty = parsedItems.map((item: StorageItem) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: itemQty,
        };
      }

      return item;
    });

    setItemInStorage('CartItems', itemsWithUpdatedQty);
    setProducts(itemsWithUpdatedQty);
  };

  const removeItem = (item: StorageItem) => {
    const parsedItems = parseStorage('CartItems');
    const filteredItems = parsedItems.filter(
      (storageItem: StorageItem) => {
        return storageItem.id !== item.id;
      },
    );

    setItemInStorage('CartItems', filteredItems);
    setProducts(filteredItems);
    setQuantity(quantity - item.quantity);
    setTotalPrice(totalPrice - item.quantity * deductDiscount(item.product));
    setCart(cart - item.quantity);
  };

  return (
    <div className="CartPage page__section">
      <Header />

      <div className="container">
        <BackButton />
        <h1 className="title CartPage__title">Cart</h1>
        <div className="grid">
          <div className="grid__item grid__item--1-16">
            {products.length === 0 && (
              <p className="body-text">Your cart is empty now</p>
            )}
            {products.map((item: StorageItem) => {
              const navLink = findNavItem(item.product.type)?.link;

              return (
                <div className="CartPage__card" key={item.id}>
                  <div className="CartPage__card-left">
                    <button
                      type="button"
                      aria-label="remove"
                      className="CartPage__cross"
                      onClick={() => removeItem(item)}
                      data-cy="cartDeleteButton"
                    />
                    <Link to={`${navLink}/${item.id}`}>
                      <img
                        src={`${BASE_URL}/${item.product.imageUrl}`}
                        alt="product_image"
                        className="CartPage__image"
                      />
                    </Link>
                    <p className="CartPage__name body-text">
                      {item.product.name}
                    </p>
                  </div>

                  <div className="CartPage__card-right">

                    <div className="CartPage__actions">
                      <button
                        type="button"
                        className={classNames(
                          'button-small',
                          'button-small--remove',
                          {
                            'button-small--remove--disable':
                            item.quantity === 1,
                          },
                        )}
                        onClick={() => {
                          saveQuantity(
                            quantity - 1,
                            item.product,
                            item.quantity - 1,
                          );
                        }}
                        aria-label="remove"
                        disabled={item.quantity === 1}
                      />
                      <p
                        className="
                          body-text body-text--center CartPage__item-qty
                        "
                      >
                        {item.quantity}
                      </p>
                      <button
                        type="button"
                        className={classNames(
                          'button-small',
                          'button-small--add',
                        )}
                        onClick={() => {
                          saveQuantity(
                            quantity + 1,
                            item.product,
                            item.quantity + 1,
                          );
                        }}
                        aria-label="add"
                      />
                    </div>

                    <p className="CartPage__item-price title title--sub">
                      {`$${deductDiscount(item.product) * item.quantity}`}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="grid__item grid__item--17-24">
            <div className="CartPage__card-total">
              <p className="title CartPage__price-total">
                $
                {totalPrice}
              </p>
              <p
                className="body-text body-text--light CartPage__text-total"
                data-cy="productQauntity"
              >
                {`Total for ${quantity} items`}
              </p>
              <button
                type="button"
                className="button body-text CartPage__checkout"
                onClick={() => {
                  setNotification(true);
                  setTimeout(() => {
                    setNotification(false);
                  }, 2000);
                }}
              >
                Checkout
              </button>
            </div>
            {notification && (
              <p className="body-text body-text--center">
                We are sorry,
                <br />
                but this feature is not implemented yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
