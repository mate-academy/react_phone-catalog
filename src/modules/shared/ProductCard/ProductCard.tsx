import { ProductPreview } from 'types/ProductPreview';
import productCard from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { Buttons } from '../../../components/Buttons';

type Props = {
  product: ProductPreview;
  showDiscount?: boolean;
};
export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const pathToProduct = `/${product.category}/${product.itemId}`;

  return (
    <div className={productCard['product-card']}>
      <div className={productCard.wrapper}>
        <div className={productCard.image__wrapper}>
          <Link to={pathToProduct}>
            <img
              src={product.image}
              alt={`${product.name} image`}
              className={productCard.image}
            />
          </Link>
        </div>
        <Link to={pathToProduct} className={productCard.name}>
          {product.name}
        </Link>
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
        <Buttons product={product} />
      </div>
    </div>
  );
};
