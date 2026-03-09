//hooks
import { useContext, useEffect, useState } from 'react';

//styles
import styles from './Cart.module.scss';

//components
import { Loader } from '../../components/Loader';

//services
import { CartContext } from '../../services/CartContext';
import { getProductsGeneral } from '../../services/api';
import { ProductGeneral } from '../../types/product';
import classNames from 'classnames';

//assets
import closeIcon from './assets/icons/Close.svg';
import plusIcon from './assets/icons/Plus.svg';
import minusIcon from './assets/icons/Minus.svg';
import minusDisabledIcon from './assets/icons/MinusDisabled.svg';

export const Cart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductGeneral[]>([]);
  const cart = useContext(CartContext)!.cart;
  const setCart = useContext(CartContext)!.setCart;

  const cartToRender: { id: string; count: number }[] = [];

  for (let i = 0; i < cart.length; i++) {
    const existing = cartToRender.find(item => item.id === cart[i]);

    if (existing) {
      existing.count += 1;
    } else {
      cartToRender.push({ id: cart[i], count: 1 });
    }
  }

  cartToRender.sort((a, b) => a.id.localeCompare(b.id));

  const handleReduceItem = (el: string) => {
    setCart(prev => {
      const index = prev.indexOf(el);

      if (index === -1) {
        return prev;
      }

      const copy = [...prev];

      copy.splice(index, 1);

      return copy;
    });
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await getProductsGeneral();

        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  const total = cart.reduce((sum, id) => {
    const product = products.find(p => p.itemId === id);

    return sum + (product?.price ?? 0);
  }, 0);

  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>
        {cart.length !== 0 ? 'Cart' : 'Cart is Empty'}
      </h1>

      {cart.length === 0 && (
        <p className={styles.smallText}>{`Let's go shopping!`}</p>
      )}

      <div className={styles.cartList}>
        {cartToRender.map((el, index) => {
          const product = products.find(p => p.itemId === el.id);
          const isSingle = el.count === 1;

          return (
            <div key={index} className={styles.cartItem}>
              <div className={styles.cartInfo}>
                <button
                  className={styles.itemDeleteButton}
                  onClick={() => setCart(cart.filter(p => p !== el.id))}
                >
                  <img src={closeIcon} alt="delete" />
                </button>

                <img
                  src={product?.image}
                  alt="product-image"
                  className={styles.itemImg}
                />

                <p className={styles.itemName}>{product?.name}</p>
              </div>

              <div className={styles.cartCounter}>
                <div className={styles.counterControl}>
                  <button
                    onClick={() => handleReduceItem(el.id)}
                    disabled={isSingle}
                    className={classNames(styles.button, {
                      [styles['button--disabled']]: isSingle,
                    })}
                  >
                    <img
                      src={isSingle ? minusDisabledIcon : minusIcon}
                      alt="minus"
                      className={styles.icon}
                    />
                  </button>

                  <p>{el.count}</p>

                  <button
                    onClick={() => setCart(prev => [...prev, el.id])}
                    className={styles.button}
                  >
                    <img src={plusIcon} alt="plus" className={styles.icon} />
                  </button>
                </div>
                <p className={styles.itemPrice}>
                  ${Number(product?.price) * el.count}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length !== 0 && (
        <div className={styles.checkoutSection}>
          <h2>${total}</h2>

          <p>
            Total for {cart.length} item{cart.length !== 1 && 's'}
          </p>

          <hr />

          <button className={styles.checkoutButton}>checkout</button>
        </div>
      )}
    </div>
  );
};
