import { Product } from 'types/Product';
import productCard from './ProductCard.module.scss';

type Props = {
  product: Product;
  showDiscount?: boolean;
};
export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  return (
    <div className={productCard['product-card']}>
      <div className={productCard.wrapper}>
        <img
          src={product.image}
          alt={`${product.name} image`}
          className={productCard.image}
        />
        <span className={productCard.name}>{product.name}</span>
        <div className={productCard.price__wrapper}>
          <span
            className={productCard['full-price']}
          >{`$${product.price}`}</span>
          {showDiscount && (
            <span className={productCard.price}>{`$${product.fullPrice}`}</span>
          )}
        </div>
        <div className={productCard.description}>
          <ul className={productCard['description-list']}>
            <li className={productCard['description-item']}>
              <span className={productCard['description-item__property']}>
                Screen
              </span>
              <span className={productCard['description-item__value']}>
                {product.screen}
              </span>
            </li>
            <li className={productCard['description-item']}>
              <span className={productCard['description-item__property']}>
                Capacity
              </span>
              <span className={productCard['description-item__value']}>
                {product.capacity}
              </span>
            </li>
            <li className={productCard['description-item']}>
              <span className={productCard['description-item__property']}>
                RAM
              </span>
              <span className={productCard['description-item__value']}>
                {product.ram}
              </span>
            </li>
          </ul>
        </div>
        <div className={productCard['buttons-wrapper']}>
          <button className={productCard['button-add-to-cart']}>
            Add to cart
          </button>
          <button className={productCard['button-to-favourites']} />
        </div>
      </div>
    </div>
  );
};
