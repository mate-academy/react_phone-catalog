import styles from './ProductAddInfo.module.scss';
import { AllProduct } from '../../../../types/AllProduct';
import { ProductsColors } from '../../../../constants/productsColors';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../../../hooks/useTheme';
import { useProductsContext } from '../../../../hooks/savedProducts';
import { useProducts } from '../../../../hooks/useProducts';
import { Icon } from '../../../../components/Icon';
import { useErrorHandling } from '../../../../hooks/errorHandling';
import { Loader } from '../../../../components/Loader';

type Props = {
  selectedProduct: AllProduct;
};

export const ProductAddInfo = ({ selectedProduct }: Props) => {
  const { likedProducts, cartProducts, toggleLike, toggleCart } =
    useProductsContext();
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));
  const { theme } = useTheme();

  const currentProduct = products.find(p => p.itemId === selectedProduct.id);

  const isLiked = currentProduct && likedProducts.includes(currentProduct.id);
  const isAddedToCart =
    currentProduct && cartProducts.includes(currentProduct.id);

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.addInfo}>
      <div className={styles.addInfo__content}>
        <div className={styles.addInfo__colorsInfo}>
          <p className={styles.addInfo__title}>Available colors</p>

          <div className={styles.addInfo__colors}>
            {selectedProduct.colorsAvailable.map(color => {
              const colorHex =
                ProductsColors[color as keyof typeof ProductsColors] || '#FFF';
              const linkColor = color.replace(' ', '-');
              const linkTo = `../${selectedProduct.namespaceId}-${selectedProduct.capacity.toLowerCase()}-${linkColor}`;

              return (
                <Link to={linkTo} key={linkColor}>
                  <div
                    className={classNames(styles.addInfo__colorWrapper, {
                      [styles.addInfo__activeColor]:
                        selectedProduct.color === color,
                    })}
                  >
                    <button
                      className={styles.addInfo__color}
                      style={{ backgroundColor: colorHex }}
                    ></button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.addInfo__divider}></div>
        <div className={styles.addInfo__capacitiesWrapper}>
          <p className={styles.addInfo__title}>Select capacity</p>

          <div className={styles.addInfo__capacities}>
            {selectedProduct.capacityAvailable.map(capacity => {
              const linkColor = selectedProduct.color.replace(' ', '-');
              const linkTo = `../${selectedProduct.namespaceId}-${capacity.toLowerCase()}-${linkColor}`;

              return (
                <Link to={linkTo} key={capacity}>
                  <div
                    className={classNames(styles.addInfo__capacityWrapper, {
                      [styles.addInfo__activeCapacity]:
                        selectedProduct.capacity === capacity,
                    })}
                  >
                    <button
                      className={classNames(styles.addInfo__capacity, {
                        [styles.addInfo__activeCapacityBtn]:
                          selectedProduct.capacity === capacity,
                      })}
                    >
                      {capacity}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.addInfo__divider}></div>
      </div>
      <div className={styles.addInfo__prices}>
        <p className={styles.addInfo__price}>{selectedProduct.priceDiscount}</p>
        <p
          className={styles.addInfo__full}
          data-theme={theme === 'dark' ? 'dark' : 'light'}
        >
          {selectedProduct.priceRegular}
        </p>
      </div>
      <div className={styles.addInfo__buttons}>
        <button
          className={classNames(styles.addInfo__cart, {
            [styles.addInfo__cartActive]: isAddedToCart,
          })}
          onClick={() => {
            if (currentProduct) {
              toggleCart(currentProduct.id);
            }
          }}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          onClick={() => {
            if (currentProduct) {
              toggleLike(currentProduct.id);
            }
          }}
          className={classNames(styles.addInfo__favourite, {
            [styles.addInfo__favouriteActive]: isLiked,
          })}
        >
          {isLiked ? (
            <Icon type="favouriteActive" />
          ) : (
            <Icon type="favourite" />
          )}
        </button>
      </div>
      <div className={styles.addInfo__char}>
        {[
          { label: 'Screen', value: selectedProduct.screen },
          { label: 'Resolution', value: selectedProduct.resolution },
          { label: 'Processor', value: selectedProduct.processor },
          { label: 'RAM', value: selectedProduct.ram },
        ].map((item, index) => (
          <div key={index} className={styles.addInfo__charItem}>
            <span className={styles.addInfo__label}>{item.label}</span>
            <span className={styles.addInfo__value}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
