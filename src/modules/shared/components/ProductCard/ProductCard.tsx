import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { ProductActions } from '../ProductActions';
import { SpecsList } from '../SpecsList';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  showDiscount?: boolean;
}

export const ProductCard = ({ product, showDiscount = true }: Props) => {
  const { itemId, name, image, price, fullPrice, screen, capacity, ram } =
    product;

  const productUrl = `/product/${itemId}`;

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  return (
    <article className={styles.card}>
      <Link
        to={productUrl}
        className={styles.imageLink}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={image} alt={name} className={styles.image} />
      </Link>

      <Link to={productUrl} className={styles.title}>
        {name}
      </Link>

      <p className={styles.prices}>
        <span className={styles.price}>
          ${showDiscount ? price : fullPrice}
        </span>

        {showDiscount && <s className={styles.fullPrice}>${fullPrice}</s>}
      </p>

      <SpecsList specs={specs} className={styles.specs} />

      <ProductActions product={product} />
    </article>
  );
};
