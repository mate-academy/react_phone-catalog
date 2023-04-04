import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CartButton } from '../CartButton';
import { FavButton } from '../FavButton';
import './style.scss';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const {
    name,
    price,
    screen,
    capacity,
    ram,
    image,
    fullPrice,
    phoneId,
    category,
  }
    = product;

  return (
    <div className="product-card" data-cy="cardsContainer">
      <Link className="product-card__link" to={`/${category}/${phoneId}`}>
        <img className="product-card__img" src={image} alt={name} />
        <p className="product-card__title">{name}</p>
        <div className="product-card__prices">
          <p className="product-card__price">{`$${fullPrice}`}</p>
          <p className="product-card__discount">
            {`$${price}`}
          </p>
        </div>
      </Link>

      <div className="product-card__tech">
        <div className="product-card__pair">
          <p className="product-card__pair-prop">Screen</p>
          <p className="product-card__pair-value">{screen}</p>
        </div>

        <div className="product-card__pair">
          <p className="product-card__pair-prop">Capacity</p>
          <p className="product-card__pair-value">{capacity}</p>
        </div>

        <div className="product-card__pair">
          <p className="product-card__pair-prop">RAM</p>
          <p className="product-card__pair-value">{ram}</p>
        </div>
      </div>

      <div className="product-card__actions">
        <CartButton width={176} height={40} product={product} />
        <FavButton width={40} height={40} product={product} />
      </div>
    </div>
  );
};
