import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { useContext } from 'react';
import { ProductContext } from '../../../store/ProductContext';
import { ProductFull } from '../../../types/Product_full';
import { SpecList } from '../SpecList/SpecList';
import styles from './ProductCard.module.scss';

type Props = {
  product: ProductFull;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favsIds, cartIds, handleCart, handleFavs } =
    useContext(ProductContext);

  return (
    <article className={styles.productCard}>
      <Link
        to={`/${product.category}/${product.id}`}
        className={styles.productCard__imageLink}
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className={styles.productCard__image}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.id}`}
        className={styles.productCard__link}
      >
        <p className={styles.productCard__name}>{product.name}</p>
      </Link>
      <h3 className={styles.productCard__price}>
        ${product.priceDiscount}{' '}
        <span className={styles.productCard__oldPrice}>
          ${product.priceRegular}
        </span>
      </h3>
      <SpecList product={product} specsToShow={4} />
      <div className={styles.productCard__buttons}>
        <Button
          textContent={
            cartIds.includes(product.id) ? 'Added to cart' : 'Add to cart'
          }
          className={
            [
              'cartSmall',
              cartIds.includes(product.id) && 'cartSmall--active',
            ].filter(Boolean) as string[]
          }
          onClick={() => handleCart(product)}
        />
        <Button
          textContent=""
          className={
            [
              'favSmall',
              favsIds.includes(product.id) && 'favSmall--active',
            ].filter(Boolean) as string[]
          }
          onClick={() => handleFavs(product)}
        />
      </div>
    </article>
  );
};
