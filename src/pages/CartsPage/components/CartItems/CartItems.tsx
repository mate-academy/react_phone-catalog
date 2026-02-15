import { useState } from 'react';
import styles from './CartItems.module.scss';
import { Icon } from '../../../../components/Icon';
import { useProductsContext } from '../../../../hooks/savedProducts';
import { useProducts } from '../../../../hooks/useProducts';
import { Link } from 'react-router-dom';
import { useErrorHandling } from '../../../../hooks/errorHandling';
import { Loader } from '../../../../components/Loader';

export const CartItems = () => {
  const { cartProducts, removeFromCart, updateProductCount, countProductsMap } =
    useProductsContext();
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));
  const [hoveredCloseButton, setHoveredCloseButton] = useState<number | null>(
    null,
  );
  const handleProductCountChange = (productId: number, change: number) => {
    updateProductCount(
      productId,
      Math.max(1, (countProductsMap[productId] || 1) + change),
    );
  };

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.items}>
      {cartProducts.map(productId => {
        const product = products.find(p => p.id === productId);

        if (!product) {
          return null;
        }

        const countProducts = countProductsMap[productId] || 1;
        const price = product.price * countProducts;

        return (
          <div className={styles.item} key={productId}>
            <div className={styles.item__wrapper}>
              <div className={styles.item__contentLeft}>
                <button
                  className={styles.item__close}
                  onClick={() => removeFromCart(productId)}
                >
                  <Icon
                    type={
                      hoveredCloseButton === productId ? 'close' : 'closeCart'
                    }
                    onMouseEnter={() => setHoveredCloseButton(productId)}
                    onMouseLeave={() => setHoveredCloseButton(null)}
                  />
                </button>
                <Link
                  to={`/${product.category}/${product.itemId}`}
                  className={styles.item__link}
                >
                  <img
                    className={styles.item__img}
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
                <Link
                  to={`/${product.category}/${product.itemId}`}
                  className={styles.item__link}
                >
                  <p className={styles.item__name}>{product.name}</p>
                </Link>
              </div>
              <div className={styles.item__contentRight}>
                <div className={styles.item__countWrapper}>
                  <button
                    className={styles.item__btn}
                    disabled={countProducts === 1}
                    onClick={() => handleProductCountChange(productId, -1)}
                  >
                    <Icon type="minus" />
                  </button>
                  <div className={styles.item__count}>{countProducts}</div>
                  <button
                    className={styles.item__btn}
                    disabled={countProducts === 10}
                    onClick={() => {
                      handleProductCountChange(productId, 1);
                    }}
                  >
                    <Icon type="plus" />
                  </button>
                </div>
                <div className={styles.item__price}>{price}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
