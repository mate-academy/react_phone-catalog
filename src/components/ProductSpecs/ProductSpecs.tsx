import { Link, useParams } from 'react-router-dom';
import styles from './ProductSpecs.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import { colorMap } from '../../utils/colorMap';

type Props = {
  product: ProductDetails;
};

export const ProductSpecs: React.FC<Props> = ({ product }) => {
  const { itemId } = useParams();
  const { capacityAvailable, capacity, colorsAvailable, color, category, id } =
    product;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const isDesktop = useIsDesktop(1200);

  const getBaseProduct = (
    details: ProductDetails,
    itemKey: string,
  ): Product => ({
    id: Number(details.namespaceId),
    itemId: itemKey,
    name: details.name,
    fullPrice: details.priceRegular,
    price: details.priceDiscount,
    screen: details.screen,
    capacity: details.capacity,
    color: details.color,
    ram: details.ram,
    year: new Date().getFullYear(),
    image: details.images[0],
    category: details.category,
  });

  const baseProduct = getBaseProduct(product, itemId || product.namespaceId);

  const toggleFavorite = () => {
    if (isFavorite(baseProduct.itemId)) {
      removeFavorite(baseProduct.itemId);
    } else {
      addFavorite(baseProduct);
    }
  };

  return (
    <div className={styles.specs}>
      {isDesktop && <span className={styles.specs__id}>ID: {id}</span>}
      <div className={styles.specs__forTheDesktop}>
        <div className={styles.specs__choices}>
          <div className={styles.specs__choice}>
            <div className={styles.specs__row}>
              <span className={styles.specs__label}>Available colors</span>
              {!isDesktop && <span className={styles.specs__id}>ID: {id}</span>}
            </div>
            <div className={styles.specs__colors}>
              {colorsAvailable.map(availableColor => {
                const isActive = availableColor === color;
                const normalizedColor = color
                  .toLowerCase()
                  .replace(/\s+/g, '-');
                const targetColor = availableColor
                  .toLowerCase()
                  .replace(/\s+/g, '-');
                const newId = id.replace(normalizedColor, targetColor);

                return (
                  <Link
                    key={availableColor}
                    to={`/${category}/${newId}`}
                    state={{ category, name: product.name }}
                    className={classNames(styles.specs__color, {
                      [styles['specs__color--active']]: isActive,
                    })}
                    aria-label={`Choose color ${availableColor}`}
                  >
                    <span
                      className={styles.specs__circle}
                      style={{
                        backgroundColor:
                          colorMap[availableColor.toLowerCase()] ||
                          availableColor,
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.specs__line}></div>

          <div className={styles.specs__choice}>
            <div className={styles.specs__row}>
              <span className={styles.specs__label}>
                {product.category === 'accessories'
                  ? 'Select size'
                  : 'Select capacity'}
              </span>
            </div>

            <div className={styles.specs__capacities}>
              {capacityAvailable.map(availableCapacity => {
                const isActive = availableCapacity === capacity;
                const newId = id.replace(
                  capacity.toLowerCase(),
                  availableCapacity.toLowerCase(),
                );

                return (
                  <Link
                    key={availableCapacity}
                    to={`/${category}/${newId}`}
                    state={{ category, name: product.name }}
                    className={classNames(styles.specs__capacity, {
                      [styles['specs__capacity--active']]: isActive,
                    })}
                    aria-label={`Choose capacity ${availableCapacity}`}
                  >
                    {availableCapacity}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.specs__line}></div>
        </div>

        <div className={styles.specs__prices}>
          <p className={styles.specs__newPrice}>${product.priceDiscount}</p>
          <p className={styles.specs__oldPrice}>${product.priceRegular}</p>
        </div>

        <div className={styles.specs__buttons}>
          <button
            className={classNames(styles['specs__buttons-add'], {
              [styles['specs__buttons-add--active']]: isInCart(
                baseProduct.itemId,
              ),
            })}
            onClick={() => addToCart(baseProduct)}
          >
            {isInCart(baseProduct.itemId) ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className={styles['specs__buttons-fav']}
            onClick={toggleFavorite}
          >
            <img
              src={
                isFavorite(baseProduct.itemId)
                  ? './img/Icons/favorites-filled.svg'
                  : './img/Icons/favorites.svg'
              }
              alt="Add to favorites"
            />
          </button>
        </div>

        <div className={styles.specs__detailes}>
          <div className={styles.specs__detailesRow}>
            <span className={styles.specs__detailesName}>Screen</span>
            <span className={styles.specs__detailesValue}>
              {product.screen}
            </span>
          </div>
          <div className={styles.specs__detailesRow}>
            <span className={styles.specs__detailesName}>Resolution</span>
            <span className={styles.specs__detailesValue}>
              {product.resolution}
            </span>
          </div>
          <div className={styles.specs__detailesRow}>
            <span className={styles.specs__detailesName}>Processor</span>
            <span className={styles.specs__detailesValue}>
              {product.processor}
            </span>
          </div>
          <div className={styles.specs__detailesRow}>
            <span className={styles.specs__detailesName}>RAM</span>
            <span className={styles.specs__detailesValue}>
              {product.ram.replace('GB', ' GB')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
