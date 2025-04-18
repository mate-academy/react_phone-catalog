import { useContext } from 'react';
import s from './ShoppingBag.module.scss';
import { ProductContext } from '../../shared/context/ProductsContext';
import { Link } from 'react-router-dom';
import { RightButtonContext } from '../../shared/context/RightButtonContext';
import { useTranslation } from 'react-i18next';

export const ShoppingBag = () => {
  const { t } = useTranslation('ShoppingBag');
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

  const totalQuantity = Object.values(shoppingBag).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const totalPrice = shoppingBagProducts.reduce((total, product) => {
    const quantity = shoppingBag[product.id] || 0;

    return total + product.price * quantity;
  }, 0);

  const checkout = () => {
    const confirmed = window.confirm(
      // eslint-disable-next-line max-len
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      setShoppingBag({});
    }
  };

  return (
    <div className="container">
      <div className={s.header__title}>
        <Link to={'..'} className={s.header__title_back}>
          <img src="./img/icons/prev.png" alt="back" />
          <p>{t('Back')}</p>
        </Link>
        <h2>{t('Cart')}</h2>
      </div>
      <div className={s.cart__wrapper}>
        {shoppingBagProducts.length > 0 ? (
          shoppingBagProducts.map(product => (
            <div className={s.cart} key={product.id}>
              <div className={s.cart__header}>
                <button
                  className={s.cart__delete}
                  onClick={() => removeItem(product.id)}
                >
                  <img
                    src="./img/icons/close.png"
                    alt="delete from shopping bag"
                  />
                </button>
                <Link to={`../${product.itemId}`} className={s.cart__photo}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <Link to={`../${product.itemId}`} className={s.cart__title}>
                  {product.name}
                </Link>
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
          <h1 className={s.empty}>{t('Your cart is empty')}</h1>
        )}
        <div className={s.price__wrapper}>
          <div className={s.price}>
            <div className={s.price__title}>
              <h2>${totalPrice}</h2>
              <p>
                {t('Total for')} {totalQuantity} {t('items')}
              </p>
            </div>
            <div className={s.price__line}></div>
            <button
              type="button"
              className={s.price__checkout}
              onClick={checkout}
            >
              {t('Checkout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
