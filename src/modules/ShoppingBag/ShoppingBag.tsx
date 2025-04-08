import { useContext } from 'react';
import s from './ShoppingBag.module.scss';
import { ProductContext } from '../../shared/context/ProductsContext';
import { Link } from 'react-router-dom';
import { RightButtonContext } from '../../shared/context/RightButtonContext';

export const ShoppingBag = () => {
  const { products } = useContext(ProductContext);
  const { shoppingBag, setShoppingBag } = useContext(RightButtonContext);
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

  const totalPrice = shoppingBagProducts.reduce((total, product) => {
    const quantity = shoppingBag[product.id] || 0;

    return total + product.price * quantity;
  }, 0);

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
        {shoppingBagProducts.length > 0 ? (
          shoppingBagProducts.map(product => (
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
                  <button
                    className={s.cart__buttons_subtract}
                    onClick={() => changeQuantity(product.id, 'decrement')}
                    disabled={shoppingBag[product.id] === 1}
                  >
                    -
                  </button>
                  <div className={s.cart__buttons_quantity}>
                    {shoppingBag[product.id]}
                  </div>
                  <button
                    className={s.cart__buttons_add}
                    onClick={() => changeQuantity(product.id, 'increment')}
                  >
                    +
                  </button>
                </div>

                <div className={s.cart__price}>
                  <h3>${product.price}</h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className={s.empty}>Your cart is empty</h1>
        )}
        <div className={s.price__wrapper}>
          <div className={s.price}>
            <div className={s.price__title}>
              <h2>${totalPrice}</h2>
              <p>Total for {shoppingBagProducts.length} items</p>
            </div>
            <div className={s.price__line}></div>
            <button
              type="button"
              className={s.price__checkout}
              onClick={() => {
                const confirmed = window.confirm(
                  // eslint-disable-next-line max-len
                  'Checkout is not implemented yet. Do you want to clear the Cart?',
                );

                if (confirmed) {
                  setShoppingBag({});
                }
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
