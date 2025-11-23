import { Product } from '../../../../api/types';
import scss from './ProductCard.module.scss';
import { ButtonFav } from '../ButtonFav/ButtonFav';
import { ButtonCart } from '../ButtonCart/ButtonCart';
import { Specs } from './Specs';
import { Price } from '../Price/Price';
import { memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  hasDiscount: boolean;
}

export const ProductCardComponent: React.FC<Props> = ({
  product,
  hasDiscount,
}) => {
  const discount = hasDiscount ? product.price : null;

  return (
    <article className={scss.productCard}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          src={product.image}
          className={scss.productCard__image}
          alt={product.name}
          loading="lazy"
        ></img>
        <h3 className={scss.productCard__name}>{product.name}</h3>
      </Link>

      <Price normal={product.fullPrice} discount={discount} />
      <div className={scss.productCard__divider}></div>
      <Specs product={product} />
      <div className={scss.productCard__buttons}>
        <ButtonCart productId={product.id} />
        <ButtonFav productId={product.id} />
      </div>
    </article>
  );
};

export const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = 'ProductCard';
