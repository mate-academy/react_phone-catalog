import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { formatScreen, formatUnits } from '../../../../utils/format';
import { AddToCartButton } from '../AddToCartButton';
import { FavoriteButton } from '../FavoriteButton';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;
  const path = `/product/${itemId}`;
  const specs = [
    ['Screen', formatScreen(screen)],
    ['Capacity', formatUnits(capacity)],
    ['RAM', formatUnits(ram)],
  ];

  return (
    <article className={styles.card}>
      <Link
        to={path}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={image} alt="" className={styles.image} loading="lazy" />
      </Link>

      <Link to={path} className={styles.title}>
        {name}
      </Link>

      <p className={styles.prices}>
        <span className={styles.price}>${price}</span>
        {fullPrice > price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </p>

      <dl className={styles.specs}>
        {specs.map(([label, value]) => (
          <div key={label} className={styles.spec}>
            <dt className={styles.specLabel}>{label}</dt>
            <dd className={styles.specValue}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.actions}>
        <AddToCartButton product={product} className={styles.cartButton} />
        <FavoriteButton product={product} />
      </div>
    </article>
  );
};
