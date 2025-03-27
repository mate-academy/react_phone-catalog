import styles from './ProductCard.module.scss';
import '../../styles/App.scss';
import PrimaryButton from '../PrimaryButton';
import FavoriteButton from '../FavoriteButton';
import Spec from '../Spec';
import Price from '../Price';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/products';

type ProductCardProps = {
  size?: 'auto';
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ size, product }) => {
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section
      className={`${styles['product-card']} ${styles[`product-card--${size}`]}`}
    >
      <NavLink
        to={`/${product.category}/${product.itemId}`}
        state={{ product }}
        onClick={handleScroll}
      >
        <img
          src={`./${product.image}`}
          alt="product-card"
          className={styles['product-card__image']}
        />
      </NavLink>

      <NavLink
        to={`/${product.category}/${product.itemId}`}
        className={styles['product-card__title']}
        onClick={handleScroll}
      >
        {product.name}
      </NavLink>
      <div className={styles['product-card__price']}>
        <Price>${product.price}</Price>
        <h3 className={styles['product-card__price-old']}>
          ${product.fullPrice}
        </h3>
      </div>
      <div className={styles['product-card__line']}></div>
      <div className={styles['product-card__info']}>
        <Spec title="Screen" description={product.screen} />
        <Spec title="Capacity" description={product.capacity} />
        <Spec title="Ram" description={product.ram} />
      </div>

      <div className={styles['product-card__buttons']}>
        <PrimaryButton product={product}>Add to cart</PrimaryButton>
        <FavoriteButton productId={product.itemId} product={product} />
      </div>
    </section>
  );
};

export default ProductCard;
