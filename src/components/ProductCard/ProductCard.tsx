import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Product } from '../../types/ProductType';
import './ProductCard.scss';
import { ItemsContext } from '../../helpers/CartContext';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addValue } = useContext(ItemsContext);

  const handleSubmit = (item: Product) => {
    return addValue(item);
  };

  return (
    <div className="card">
      <Link to={`..${product.phoneId}`} className="card__image">
        <img
          className="card__photo"
          src={`/_new/${product.image}`}
          alt={product.name}
        />

        <p className="card__name">{product.name}</p>
      </Link>

      <div className="card__text">
        <div className="card__price">
          <span>
            {`$${product.price}`}
          </span>

          {product.price < 1000 && (
            <span className="card__old-price">{`$${product.fullPrice}`}</span>
          )}
        </div>
        <div className="card__content">
          <div className="card__info">
            <p className="card__desc">Screen</p>
            <p className="card__value">
              {product.screen}
            </p>
          </div>
          <div className="card__info">
            <p className="card__desc">Capacity</p>
            <p className="card__value">
              {product.capacity}
            </p>
          </div>
          <div className="card__info">
            <p className="card__desc">RAM</p>
            <p className="card__value">
              {product.ram}
            </p>
          </div>
        </div>
        <div className="control">
          <button
            type="button"
            className="add-button"
            onClick={() => handleSubmit(product)}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="favourite-button"
          >
            <img
              src="../../icons/Favourites(HeartLike).svg"
              alt="Like"
              className="icon--favour"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
