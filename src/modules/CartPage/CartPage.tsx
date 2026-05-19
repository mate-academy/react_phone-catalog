import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { useCartAndFavContext } from '../shared/context/CartAndFavContext';
import { Product } from '../../types/ProductType';
import { getProductData } from '../../api/fetchClient';
import classNames from 'classnames';
import emptyCartImg from '../../images/cart-is-empty.png';

type Commands = 'plus' | 'minus' | 'delete';

export const CartPage = () => {
  const navigate = useNavigate();
  const context = useCartAndFavContext();
  const { cart, changeQuantity, clearCart } = context;
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductData();

      if (data) {
        const visibleProducts = data.filter(p =>
          cart.some(item => item.id === p.itemId),
        );

        setProducts(visibleProducts);
      } else {
        fetchData();
      }
    }

    fetchData();
  }, [cart]);

  const totalPrice = cart.reduce((sum, item) => {
    const product = products?.find(p => p.itemId === item.id);

    return sum + item.quantity * (product?.price || 0);
  }, 0);

  const totalCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const getQuantity = (id: string) => {
    return cart.find(c => c.id === id)?.quantity || 0;
  };

  const getProductLink = (product: Product) => {
    return `/${product.category}/${product.itemId}`;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeQuantity = (id: string, command: Commands) => {
    changeQuantity(id, command);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles['back-button']} onClick={() => handleGoBack()}>
          <Icon name="arrowleft" className={styles.icon} />
          <div className={styles.text}>Back</div>
        </div>
        <div className={styles.empty}>
          <img
            src={emptyCartImg}
            className={styles.empty__image}
            alt="cart is empty "
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles['back-button']} onClick={() => handleGoBack()}>
        <Icon name="arrowleft" className={styles.icon} />
        <div className={styles.text}>Back</div>
      </div>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.cart}>
        <div className={styles.items}>
          {products &&
            products.map((item, index) => (
              <div className={styles.item} key={index}>
                <Icon
                  name="close"
                  className={styles.icon}
                  onClick={() => handleChangeQuantity(item.itemId, 'delete')}
                />
                <Link className={styles.image} to={getProductLink(item)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.image__img}
                  />
                </Link>
                <Link className={styles.text} to={getProductLink(item)}>
                  {item.name}
                </Link>

                <div className={styles.buttons}>
                  <div
                    className={classNames(styles.buttons__button, {
                      [styles['buttons__button--disable']]:
                        getQuantity(item.itemId) <= 1,
                    })}
                    onClick={() =>
                      getQuantity(item.itemId) > 1 &&
                      handleChangeQuantity(item.itemId, 'minus')
                    }
                  >
                    <Icon name="minus" className={styles.icon} />
                  </div>
                  <div className={styles.quantity}>
                    {getQuantity(item.itemId)}
                  </div>
                  <div
                    className={classNames(styles.buttons__button, {
                      [styles['buttons__button--disable']]:
                        getQuantity(item.itemId) >= 999,
                    })}
                    onClick={() =>
                      getQuantity(item.itemId) <= 999 &&
                      handleChangeQuantity(item.itemId, 'plus')
                    }
                  >
                    <Icon name="plus" className={styles.icon} />
                  </div>
                </div>
                <div className={styles.price}>${item.price}</div>
              </div>
            ))}
        </div>
        <div className={styles.order}>
          <div className={styles.cost}>${totalPrice}</div>
          <div className={styles['items-count']}>
            Total for {totalCount} items
          </div>
          <div className={styles.separator} />
          <button className={styles.button} onClick={() => clearCart()}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
