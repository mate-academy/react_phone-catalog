import { Link } from 'react-router-dom';

import { Product } from '../../../types/Product';
import { Buttons } from '../Buttons';

interface Props {
  product: Product;
  hasHotPrice: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, hasHotPrice }) => {
  const category = product.category.toLowerCase();

  const link = `/${category}/${product.id}`;

  return (
    <article className="product">
      <Link to={link}>
        <img
          className="product__image"
          src={product.images[0]}
          alt="product-image"
        />
      </Link>

      <Link to={link} className="product__name-link">
        <p className="product__name">{product.name}</p>
      </Link>

      <div className="product__prices">
        <p className="product__price">${product.priceDiscount}</p>
        {hasHotPrice && (
          <p className="product__price product__price--discount">
            ${product.priceRegular}
          </p>
        )}
      </div>

      <div className="product__specs">
        <div className="product__details">
          <p className="product__details--name">Screen</p>

          <p className="product__details--detail">{product.screen}</p>
        </div>

        <div className="product__details">
          <p className="product__details--name">Capacity</p>

          <p className="product__details--detail">{product.capacity}</p>
        </div>

        <div className="product__details">
          <p className="product__details--name">RAM</p>

          <p className="product__details--detail">{product.ram}</p>
        </div>

        <div className="product__buttons">
          <Buttons
            product={product}
            cartClasses={['product__cart', 'product__cart--added']}
            favoritesClasses={['product__favorite', 'product__favorite--added']}
          />
        </div>
      </div>
    </article>
  );
};
