import { Link } from 'react-router-dom';
import { Product } from '../../types/ProductTypes';
import styles from './ProductCardStyles.module.scss';
import { CardPrice } from '../CardPrice/CardPrice';
import { CharactersProduct } from '../CharactersProduct/CharactersProduct';
import { ButtonsCard } from '../ButtonsCard/ButtonsCard';

type Props = {
  product: Product;
  isExtended?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, isExtended = false }) => {
  return (
    <section className="product-grid">
      <div
        className={isExtended ? styles.extendedCardWrapper : styles.iphone14_card}
        key={product.itemId}
      >
        <div className={styles.center_for_card}>
          <Link to={`/${product.category}/${product.itemId}`}>
            <img src={product.image} alt={product.name} className={styles.products_photo} />
          </Link>
          <Link className={styles.name_styles} to={`/${product.category}/${product.itemId}`}>
            <p className={styles.name_font_styles}>{product.name}</p>
          </Link>
        </div>

        <CardPrice product={product} />

        <div className={styles.grey_line}></div>

        <CharactersProduct product={product} />

        <ButtonsCard product={product} />
      </div>
    </section>
  );
};
