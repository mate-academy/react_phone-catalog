import { Link } from 'react-router-dom';
import { Product } from '../../modules/shared/types/Product';
import { ButtonAddToCart } from '../ButtonAddToCart';
import { Price } from '../Price';
import styles from './ProductCard.module.scss';
import { ModelCharact } from '../ModelCharact';

type Props = {
  product: Product;
  isFullPrise?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isFullPrise }) => {
  const characteristics: (keyof Product)[] = ['screen', 'capacity', 'ram'];

  return (
    <div className={styles.product}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.product__link}
      >
        <img
          className={styles.product__image}
          src={product.image}
          alt={product.name}
        />
        <p className={styles.product__name}>{product.name}</p>
      </Link>
      <Price
        price={product.price}
        levelTitle={3}
        levelTitleSize={'price-small'}
        fullPrise={isFullPrise ? product.fullPrice : null}
      />
      <hr />
      <div className={styles.product__characteristics}>
        {characteristics.map(characteristic => (
          <ModelCharact
            product={product}
            property={characteristic}
            key={characteristic}
            weight={700}
          />
        ))}
      </div>
      <ButtonAddToCart productId={product.itemId} />
    </div>
  );
};
