import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Producst';
import s from './ProductCard.module.scss';
import { TechSpecs } from '../TechSpecs';
import { AddButton } from '../ui/Buttons/AddButton';
import { LikeButton } from '../ui/Buttons/LikeButton/LikeButton';

type Props = {
  product: Product;
  isFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isFullPrice = true,
}) => {
  return (
    <div className={s['product-card']}>
      <NavLink to={`/${product.category}/${product.itemId}`}>
        <img
          src={`${product.image}`}
          alt={product.name}
          className={s['product-card__img']}
        />
      </NavLink>

      <NavLink
        to={`/${product.category}/${product.itemId}`}
        className={s['product-card__name']}
      >
        {product.name}
      </NavLink>

      <div className={s['product-card__price']}>
        <div className={s['product-card__actual-price']}>${product.price}</div>

        {isFullPrice && (
          <div className={s['product-card__full-price']}>
            ${product.fullPrice}
          </div>
        )}
      </div>

      <div className={s['product-card__line']}></div>

      <TechSpecs specs={['screen', 'capacity', 'ram']} product={product} />

      <div className={s['product-card__action']}>
        <AddButton product={product} />

        <LikeButton product={product} />
      </div>
    </div>
  );
};
