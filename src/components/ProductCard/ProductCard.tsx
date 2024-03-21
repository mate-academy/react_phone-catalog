import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Product } from '../../type/Product';
import './ProductCard.scss';
import { DispatchContext } from '../../store/ProductsContext';

type Props = {
  product: Product;
  isFavourite?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isFavourite = false,
}) => {
  const dispatch = useContext(DispatchContext);
  const [isFan, setIsFan] = useState(isFavourite);
  const screen = product.screen.replace("' ", '” ');
  const capacity = product.capacity.replace('GB', ' GB');
  const ram = product.ram.replace('GB', ' GB');

  const handleFunCclick = () => {
    if (!isFan) {
      dispatch({ type: 'addFavourites', payload: product.itemId });
    } else {
      dispatch({ type: 'deleteFavourites', payload: product.itemId });
    }

    setIsFan(!isFan);
  };

  return (
    <div className="Card" data-cy="cardsContainer">
      <Link to={`${product.itemId}`} className="Card__link">
        <img src={product.image} alt={product.name} className="Card__photo" />
        <p className="Card__product-name" title={product.name}>
          {product.name}
        </p>
        <div className="Card__price">
          <div className="Card__price-current">{`$${product.price}`}</div>
          {product.fullPrice && (
            <div className="Card__price-full">{`$${product.fullPrice}`}</div>
          )}
        </div>
        <div className="Card__line" />
        <div className="Card__description">
          <div className="Card__description-item">
            <p className="Card__description-text">Screen</p>
            <p className="Card__description-value">{screen}</p>
          </div>
          <div className="Card__description-item">
            <p className="Card__description-text">Capacity</p>
            <p className="Card__description-value">{capacity}</p>
          </div>
          <div className="Card__description-item">
            <p className="Card__description-text">RAM</p>
            <p className="Card__description-value">{ram}</p>
          </div>
        </div>
      </Link>

      <div className="Card__buttons">
        <button type="button" className="Card__buttons-add">
          Add to cart
        </button>

        <button
          type="button"
          className="Card__buttons-favorite"
          onClick={handleFunCclick}
        >
          <img
            src={isFan ? 'icons/Heart_Like_Red.svg' : 'icons/Heart_Like.svg'}
            alt="favorite"
            className="Card__buttons-favorite-icon"
          />
        </button>
      </div>
    </div>
  );
};
