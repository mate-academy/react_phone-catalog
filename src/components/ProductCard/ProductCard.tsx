import { Link } from 'react-router-dom';
import { getFinalPrice } from '../../utils/productsHelper';
import { Product } from '../../types/Product';
import { CartButton } from '../CartButton';
import { FavouritesButton } from '../FavouritesButton';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => (
  <Link to={`/${product.type}s/${product.id}`} className="ProductCard">
    <div className="ProductCard__content">
      <div className="ProductCard__image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="ProductCard__image"
        />
      </div>

      <p className="ProductCard__title">{product.name}</p>

      <div className="ProductCard__prices">
        <h2 className="ProductCard__new-price">
          {`$${getFinalPrice(product.price, product.discount)}`}
        </h2>

        {!!product.discount && (
          <h2 className="ProductCard__old-price">{`$${product.price}`}</h2>
        )}
      </div>

      <div className="ProductCard__details">
        <div className="ProductCard__detail">
          <p className="ProductCard__detail-name">Screen</p>
          <p className="ProductCard__detail-text">{product.screen || '-'}</p>
        </div>

        <div className="ProductCard__detail">
          <p className="ProductCard__detail-name">Capacity</p>
          <p className="ProductCard__detail-text">{product.capacity || '-'}</p>
        </div>

        <div className="ProductCard__detail">
          <p className="ProductCard__detail-name">RAM</p>
          <p className="ProductCard__detail-text">{product.ram || '-'}</p>
        </div>
      </div>

      <div className="ProductCard__buttons">
        <div className="ProductCard__add-button">
          <CartButton product={product} />
        </div>

        <div className="ProductCard__favourites-button">
          <FavouritesButton product={product} />
        </div>
      </div>
    </div>
  </Link>
);
