import classNames from 'classnames';
import { BackButton } from '../../components/BackButton/BackButton';
import styles from './Cart.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ActionsContext, StateContext } from '../../utils/GlobalContext';
import { Product } from '../../types/data';
import { getProducts } from '../../utils/fetchProducts';
import { CartItem } from './components/CartItem/CartItem';
import { ModalDialogue } from './components/ModalDialogue/ModalDialogue';

export const Cart = () => {
  const { cart } = useContext(StateContext);
  const { setCart } = useContext(ActionsContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const productsMap: Map<number, number> = useMemo(() => {
    const map = new Map();

    for (const i of cart) {
      if (map.has(i)) {
        map.set(i, map.get(i) + 1);
      } else {
        map.set(i, 1);
      }
    }

    return map;
  }, [cart]);
  const totalCost = useMemo(() => {
    return products.reduce(
      (prev, curr) => prev + curr.price * (productsMap.get(curr.id) || 0),
      0,
    );
  }, [productsMap, products]);
  const removeItem = (id: number) => {
    const newCartList = cart.filter(p => p !== id);

    setCart(newCartList);
  };

  const dicrItem = (id: number) => {
    const count = productsMap.get(id) !== undefined ? productsMap.get(id) : 0;

    if (!count || count <= 1) {
      removeItem(id);
    }

    const index = cart.findIndex(p => p === id);
    const newlist = cart.filter((p, i) => i !== index);

    setCart(newlist);
  };

  const incrItem = (id: number) => {
    setCart(prev => [...prev, id]);
  };

  useEffect(() => {
    if (cart.length === 0) {
      setIsEmpty(true);

      return;
    }

    getProducts()
      .then(result => setProducts(result.filter(p => cart.includes(p.id))))
      .catch(() => setProducts([]));
  }, [cart]);

  return (
    <div className={classNames(styles.cart)}>
      <BackButton />
      <h1 className={classNames(styles.cart__title)}>Cart</h1>
      {!isEmpty && (
        <div className={classNames(styles.cart__content)}>
          <div className={classNames(styles.cart__list)}>
            {products.map((p, i) => (
              <div className={classNames(styles.cart__item)} key={i}>
                <CartItem
                  item={p}
                  count={productsMap.get(p.id) || 0}
                  onPlus={incrItem}
                  onMinus={dicrItem}
                  onRemove={removeItem}
                />
              </div>
            ))}
          </div>
          <div className={classNames(styles.cart__total)}>
            {isModalOpened && (
              <ModalDialogue setClose={() => setIsModalOpened(false)} />
            )}
            <div className={classNames(styles.cart__price)}>
              <div className={classNames(styles['cart__price-number'])}>
                ${totalCost}
              </div>
              <div
                className={classNames(styles['cart__price-text'])}
              >{`Total for ${totalCost} items`}</div>
            </div>
            <button
              className={classNames(styles.cart__buy)}
              onClick={() => setIsModalOpened(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {isEmpty && (
        <div className={classNames(styles.cart__empty)}>Your cart is empty</div>
      )}
    </div>
  );
};
