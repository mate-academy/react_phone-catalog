import styles from './CartPage.module.scss';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';
import CustomizedBreadcrumbs from '../../shared/BreadCrumbs/BreadCrumbs';
import classNames from 'classnames';
import { Goods } from './components/Goods/Goods';
import { Tobuy } from './components/ToBuy/Tobuy';
import { NotCartProducts } from './components/NotCartProducts/NotCartProducts';

export const CartPage = () => {
  const { isGoods, isSunSelected } = useContext(GlobalContext);

  return (
    <>
      <div className={styles.crumbs}>
        <CustomizedBreadcrumbs />
      </div>
      <section className={styles.cart}>
        <div className={styles.cart__continer}>
          <h2
            className={classNames(styles.cart__title, {
              [styles.cart__title_dark]: !isSunSelected,
            })}
          >
            Cart
          </h2>

          {isGoods.length > 0 ? (
            <div className={styles.cart__box}>
              <div className={styles.goods}>
                {isGoods.map(product => (
                  <Goods
                    key={product.id}
                    product={product}
                    category={product.category}
                  />
                ))}
              </div>

              <Tobuy />
            </div>
          ) : (
            <NotCartProducts />
          )}
        </div>
      </section>
    </>
  );
};
