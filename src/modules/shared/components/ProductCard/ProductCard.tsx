import { Product } from '../../../../api/types';
import scss from './ProductCard.module.scss';
import { ButtonFav } from '../ButtonFav/ButtonFav';
import { ButtonCart } from '../ButtonCart/ButtonCart';
import { Specs } from './Specs';
import { Price } from '../Price/Price';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Line } from '../Line';

interface Props {
  product: Product;
  hasDiscount: boolean;
}

export const ProductCardComponent: React.FC<Props> = ({
  product,
  hasDiscount,
}) => {
  return (
    <article className={scss.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ hasDiscount: hasDiscount }}
      >
        <img
          src={`/${product.image}`}
          className={scss.productCard__image}
          alt={product.name}
          loading="lazy"
        ></img>
        <h3 className={scss.productCard__name}>{product.name}</h3>
      </Link>

      <Price
        normal={product.fullPrice}
        discount={product.price}
        hasDiscount={hasDiscount}
      />
      <Line className={scss.productCard__divider} />
      <Specs product={product} />
      <div className={scss.productCard__buttons}>
        <ButtonCart
          productId={product.id}
          image={product.image}
          name={product.name}
          price={hasDiscount ? product.price : product.fullPrice}
        />
        <ButtonFav productId={product.id} hasDiscount={hasDiscount} />
      </div>
    </article>
  );
};

export const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = 'ProductCard';
