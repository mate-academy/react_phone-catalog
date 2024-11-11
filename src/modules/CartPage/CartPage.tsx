import styles from './CartPage.module.scss';
import { BackBtn } from '../../components/BackBtn';
import { getPrevPath } from '../../utils/getPrevPath';
import { useLocation } from 'react-router-dom';
import { ProductCart } from './components';
import { useContext } from 'react';
import { CartContext } from '../../ContextProvider';
import { CartBtnType } from '../../types/CartBtnType';

export const CartPage = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { state, pathname } = useLocation();
  const prevPath = getPrevPath(pathname);
  const { search, pathname: path } = state ?? { search: '', pathname: '' };

  const handleCart = (cartBtnType: CartBtnType, productId: string) => {
    const item = cartProducts.find(({ id }) => id === productId);

    if (!item) {
      return;
    }

    const { id, quantity, product } = item;
    const index = cartProducts.findIndex(
      ({ id: itemId }) => itemId === productId,
    );

    const filteredCart = cartProducts.filter(
      ({ id: itemId }) => itemId !== productId,
    );
    const changeQuantity = () => {
      return [
        ...filteredCart.slice(0, index),
        {
          id,
          quantity:
            cartBtnType === CartBtnType.add ? quantity + 1 : quantity - 1,
          product,
        },
        ...filteredCart.slice(index),
      ];
    };

    if (cartBtnType === CartBtnType.delete) {
      setCartProducts([...filteredCart]);

      return;
    }

    setCartProducts(changeQuantity());
  };

  return (
    <section className={styles.container}>
      <BackBtn path={path} prevPath={prevPath} search={search} />
      <h2 className={styles.productTitle}>Cart</h2>
      <div className={styles.contentContainer}>
        {!!cartProducts.length ? (
          cartProducts.map(product => (
            <ProductCart
              cartProduct={product}
              handleCart={handleCart}
              key={product.id}
            />
          ))
        ) : (
          <>
            <p className={styles.titleEmpty}>
              Looks like you haven’t added anything to your cart yet.
              Let’s&nbsp;fill&nbsp;it&nbsp;up!
            </p>
            <div className={styles.emptyFavImg}></div>
          </>
        )}
      </div>
    </section>
  );
};
