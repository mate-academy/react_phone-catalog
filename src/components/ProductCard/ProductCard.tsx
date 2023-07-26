import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CardButton } from '../CardButton';
import { useAppDispatch } from '../../app/hooks';
import { getDetails } from '../../features/selectedProductSlice';
import { scrollToTop } from '../../utils/scrollToTop';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    category,
    itemId,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const dispatch = useAppDispatch();

  const handleSelectProduct = () => {
    dispatch(getDetails(itemId));

    scrollToTop();
  };

  return (
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={`../${category}/${itemId}`}
        className="product-card__link"
        onClick={handleSelectProduct}
      />

      <div className="product-card__image">
        <img
          className="product-card__picture"
          src={image}
          alt={name}
        />
      </div>

      <h3 className="product-card__title">
        {name}
      </h3>

      <div className="product-card__price">
        <span className="product-card__discountPrice">
          {price
            ? `$${price}`
            : `$${fullPrice}`}
        </span>

        {price < fullPrice && (
          <span className="product-card__fullPrice">
            {`$${fullPrice}`}
          </span>
        )}
      </div>

      <div className="product-card__features">
        <span className="product-card__feature-item">
          Screen

          <div className="product-card__feature-info">
            {screen}
          </div>
        </span>

        <span className="product-card__feature-item">
          Capacity

          <div className="product-card__feature-info">
            {capacity}
          </div>
        </span>

        <span className="product-card__feature-item">
          RAM

          <div className="product-card__feature-info">
            {ram}
          </div>
        </span>
      </div>

      <div className="product-card__buttons">
        <div className="card-button">
          <CardButton
            typeButton="cart"
            size="small"
            product={product}
          />

          <CardButton
            typeButton="favorites"
            size="small"
            product={product}
          />
        </div>
      </div>
    </div>
  );
};
