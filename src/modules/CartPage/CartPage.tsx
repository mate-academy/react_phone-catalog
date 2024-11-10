import styles from './CartPage.module.scss';
import { BackBtn } from '../../components/BackBtn';
import { getPrevPath } from '../../utils/getPrevPath';
import { useLocation } from 'react-router-dom';
import { CartProduct } from './components';
import { useContext } from 'react';
import { CartContext } from '../../ContextProvider';
import { CartBtnType } from '../../types/CartBtnType';

export const CartPage = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { state, pathname } = useLocation();
  const prevPath = getPrevPath(pathname);
  const { search, pathname: path } = state ?? { search: '', pathname: '' };

  const handleCart = (cartBtnType: CartBtnType, productId: string) => {
    const product = cartProducts.find(({ id }) => id === productId);

    if (product) {
      if (cartBtnType === CartBtnType.add) {
        setCartProducts([...cartProducts, product]);
      }

      if (cartBtnType === CartBtnType.subtract) {
        setCartProducts([
          ...cartProducts.slice(
            0,
            cartProducts.findIndex(({ id }) => id === productId),
          ),
          ...cartProducts.slice(
            cartProducts.findIndex(({ id }) => id === productId) + 1,
          ),
        ]);
      }

      if (cartBtnType === CartBtnType.delete) {
        setCartProducts(cartProducts.filter(({ id }) => id !== productId));
      }
    }
  };

  return (
    <section className={styles.container}>
      <BackBtn path={path} prevPath={prevPath} search={search} />
      <h2 className={styles.productTitle}>Cart</h2>
      <div className={styles.contentContainer}>
        {cartProducts.map(product => (
          <CartProduct
            product={product}
            handleCart={handleCart}
            key={product.id}
          />
        ))}
      </div>
    </section>
  );
};
