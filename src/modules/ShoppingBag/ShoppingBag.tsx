import { useContext } from 'react';
import s from './ShoppingBag.module.scss';
import { ProductContext } from '../../shared/context/ProductsContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

export const ShoppingBag = () => {
  const { products } = useContext(ProductContext);
  const [shoppingBag, setShoppingBag] = useLocalStorage<Record<number, number>>(
    'shopping-bag',
    {},
  );
  const shoppingBagProducts = products.filter(item =>
    shoppingBag.hasOwnProperty(item.id),
  );

  const removeItem = (id: number) => {
    const updatedShoppingBag = { ...shoppingBag };

    delete updatedShoppingBag[id];
    setShoppingBag(updatedShoppingBag);
  };

  const changeQuantity = (id: number, action: 'increment' | 'decrement') => {
    const updatedShoppingBag = { ...shoppingBag };

    if (action === 'increment') {
      updatedShoppingBag[id] = (updatedShoppingBag[id] || 0) + 1;
    } else if (action === 'decrement' && updatedShoppingBag[id] > 1) {
      updatedShoppingBag[id] -= 1;
    }

    setShoppingBag(updatedShoppingBag);
  };

  return (
    <div className="container">
      <div className={s.header__title}>
        <Link to={'..'} className={s.header__title_back}>
          <img src="./img/icons/prev.png" alt="back" />
          <p>Back</p>
        </Link>
        <h2>Cart</h2>
      </div>
      <div className={s.cart__wrapper}>
        {shoppingBagProducts.map(product => (
          <div className={s.cart} key={product.id}>
            <div className={s.cart__header}>
              <div
                className={s.cart__delete}
                onClick={() => removeItem(product.id)}
              >
                <img
                  src="./img/icons/close.png"
                  alt="delete from shopping bag"
                />
              </div>
              <div className={s.cart__photo}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={s.cart__title}>{product.name}</div>
            </div>
            <div className={s.cart__bottom}>
              <div className={s.cart__buttons}>
                <div
                  className={s.cart__buttons_subtract}
                  onClick={() => changeQuantity(product.id, 'decrement')}
                >
                  -
                </div>
                <div className={s.cart__buttons_quantity}>
                  {shoppingBag[product.id]}
                </div>
                <div
                  className={s.cart__buttons_add}
                  onClick={() => changeQuantity(product.id, 'increment')}
                >
                  +
                </div>
              </div>

              <div className={s.cart__price}>
                <h3>${product.price}</h3>
              </div>
            </div>
          </div>
        ))}
        <div className={s.price__wrapper}>
          <div className={s.price}>
            <div className={s.price__title}>
              <h2>
                $
                {shoppingBagProducts.reduce((sum, item) => sum + item.price, 0)}
              </h2>
              <p>Total for {shoppingBagProducts.length} items</p>
            </div>
            <div className={s.price__line}></div>
            <button type="button" className={s.price__checkout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
