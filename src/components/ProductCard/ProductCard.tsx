import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import classNames from 'classnames';
import { useProductsContext } from '../../hooks/savedProducts';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  product: Product;
  path: string;
  checkPrice?: boolean;
};

export const ProductCard = ({ product, path, checkPrice }: Props) => {
  const { likedProducts, cartProducts, toggleLike, toggleCart } =
    useProductsContext();
  const { theme } = useTheme();
  const isLiked = likedProducts.includes(product.id);
  const isAddedToCart = cartProducts.includes(product.id);

  return (
    <article className={styles.product}>
      <div className={styles.product__content}>
        <Link to={path} className={styles.product__link}>
          <img
            src={`${product.image}`}
            className={styles.product__img}
            alt={product.name}
          />
        </Link>

        <Link to={path}>
          <p className={styles.product__title}>{product.name}</p>
        </Link>

        {!checkPrice ? (
          <p className={styles.product__price}>{product.price}</p>
        ) : (
          <div className={styles.product__prices}>
            <p className={styles.product__price}>{product.price}</p>
            <p
              className={styles.product__full}
              data-theme={theme === 'dark' ? 'dark' : 'light'}
            >
              {product.fullPrice}
            </p>
          </div>
        )}

        <div className={styles.product__divider} />

        <div className={styles.product__description}>
          {[
            { label: 'Screen', value: product.screen },
            { label: 'Capacity', value: product.capacity },
            { label: 'RAM', value: product.ram },
          ].map((item, index) => (
            <div key={index} className={styles.product__descriptionItem}>
              <span className={styles.product__label}>{item.label}</span>
              <span className={styles.product__value}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.product__buttons}>
          <button
            className={classNames(styles.product__cart, {
              [styles.product__cartActive]: isAddedToCart,
            })}
            onClick={event => {
              event.preventDefault();
              toggleCart(product.id);
            }}
          >
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </button>
          <button
            className={classNames(styles.product__favourite, {
              [styles.product__favouriteActive]: isLiked,
            })}
            onClick={() => toggleLike(product.id)}
          >
            {isLiked ? (
              <Icon type="favouriteActive" />
            ) : (
              <Icon type="favourite" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
