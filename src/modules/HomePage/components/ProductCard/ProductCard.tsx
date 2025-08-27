import { Product } from '../../../../api/types';
import scss from './ProductCard.module.scss';

interface Props {
  product: Product;
  discount: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, discount }) => {
  const normalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.fullPrice);

  const discountPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className={scss.productCard}>
      <img
        src={product.image}
        className={scss.productCard__image}
        alt={product.name}
        loading="lazy"
      ></img>
      <h3 className={scss.productCard__name}>{product.name}</h3>
      <div className={scss.productCard__priceLine}>
        <p className={scss.productCard__price}>
          {discount ? discountPrice : normalPrice}
        </p>
        {discount && (
          <p className={scss.productCard__discount}>{normalPrice}</p>
        )}
      </div>

      <div className={scss.productCard__divider}></div>
      <dl className={scss.productCard__specs}>
        <div className={scss.productCard__specs__line}>
          <dt
            className={`${scss.productCard__specs__text} ${scss.productCard__specs__type}`}
          >
            Screen
          </dt>
          <dd
            className={`${scss.productCard__specs__text} ${scss.productCard__specs__value}`}
          >
            {product.screen}
          </dd>
        </div>
        <div className={scss.productCard__specs__line}>
          <dt
            className={`${scss.productCard__specs__text} ${scss.productCard__specs__type}`}
          >
            Capacity
          </dt>
          <dd
            className={`${scss.productCard__specs__text} ${scss.productCard__specs__value}`}
          >
            {product.capacity}
          </dd>
        </div>
        <div className={scss.productCard__specs__line}>
          <dt
            className={`${scss.productCard__specs__text} ${scss.productCard__specs__type}`}
          >
            RAM
          </dt>
          <dd
            className={`${scss.productCard__specs__text} ${scss.productCard__specs__value}`}
          >
            {product.ram}
          </dd>
        </div>
        <div className={scss.productCard__buttons}>
          <button className={scss.productCard__buttons__cart}>
            Add to cart
          </button>
          <button
            className={scss.productCard__buttons__buttonIcon}
            aria-label="Add to favourites"
          >
            <svg
              className={scss.productCard__buttons__icon}
              aria-hidden="true"
              focusable="false"
            >
              <use href="/icons/icons.svg#heart-icon"></use>
            </svg>
          </button>
        </div>
      </dl>
    </article>
  );
};
