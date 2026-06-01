import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard as ProductCardType } from '../../../../services/api';
import style from './ProductCard.module.scss';
import { FavouriteButton } from '../../../../components/FavouriteButton';
import { AddButton } from '../../../../components/AddButton';
import cn from 'classnames';

interface ProductCardProps {
  product: ProductCardType;
  showDiscount?: boolean;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
  showDiscount = true,
  className,
}) => {
  return (
    <Link to={`/product/${product.id}`} className={cn(style.card, className)}>
      <div className={style.imageWrapper}>
        <img src={product.image} alt={product.name} className={style.image} />
      </div>

      <div className={style.content}>
        <h3 className={style.name}>{product.name}</h3>

        <div className={style.priceSection}>
          <span className={style.price}>${product.price}</span>
          {/* Показываем дисконт ТОЛЬКО если showDiscount = true */}
          {showDiscount && product.discount > 0 && (
            <>
              <span className={style.oldPrice}>
                ${product.price + product.discount}
              </span>
            </>
          )}
        </div>

        {(product.screen || product.capacity || product.ram) && (
          <div className={style.specs}>
            {product.screen && (
              <div className={style.spec}>
                <span className={style.label}>Screen</span>
                <span className={style.value}>{product.screen}</span>
              </div>
            )}
            {product.capacity && (
              <div className={style.spec}>
                <span className={style.label}>Capacity</span>
                <span className={style.value}>{product.capacity}</span>
              </div>
            )}
            {product.ram && (
              <div className={style.spec}>
                <span className={style.label}>RAM</span>
                <span className={style.value}>{product.ram}</span>
              </div>
            )}
          </div>
        )}
        <div className={style.buttonSection}>
          <AddButton product={product} />
          <FavouriteButton id={product.id} />
        </div>
      </div>
    </Link>
  );
};
