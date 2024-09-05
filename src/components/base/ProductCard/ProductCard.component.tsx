import { ProductSummary } from '../../../types/ProductSummary';
import { Icon } from '../../base/Icon/Icon.component';
import { Button } from '../Button/Button.component';
import { calculateDiscount } from '../../../utils/calculateDiscount';
import { useContext } from 'react';
import {
  StatesContext,
  DispatchContext,
} from '../../../store/GlobalStateProvider';

type Props = {
  product: ProductSummary;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  const { cart, favorites } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const addedToCart = cart.includes(product);

  const addToCart = () => {
    dispatch({ type: 'addToCart', payload: product });
  };

  const removeFromCart = () => {
    dispatch({ type: 'removeFromCart', payload: product.id });
  };

  const addedToFavorites = favorites.includes(product);
  const addToFavorites = () => {
    dispatch({ type: 'addToFavorites', payload: product });
  };

  const removeFromFavorites = () => {
    dispatch({ type: 'removeFromFavorites', payload: product.id });
  };

  return (
    <div className="card">
      <figure className="card__image-wrapper">
        <img src={product.image} className="card__image" />
      </figure>
      <div className="card__product-name">{product.name}</div>
      <div className="card__price">
        {showDiscount ? (
          <>
            <div className="card__price-current">
              <h3>${product.price}</h3>
            </div>
            <div className="card__price-full">${product.fullPrice}</div>
            <h3 className="card__price-discount">
              {calculateDiscount(product).toFixed(1)}% OFF
            </h3>
          </>
        ) : (
          <>
            <div className="card__price-current">
              <h3>${product.fullPrice}</h3>
            </div>
          </>
        )}
      </div>
      <div className="card__specs">
        <div className="card__specs-line">
          <div className="card__specs-title">Screen</div>
          <div className="card__specs-content">{product.screen}</div>
        </div>
        <div className="card__specs-line">
          <div className="card__specs-title">Capacity</div>
          <div className="card__specs-content">{product.capacity}</div>
        </div>
        <div className="card__specs-line">
          <div className="card__specs-title">RAM</div>
          <div className="card__specs-content">{product.ram}</div>
        </div>
      </div>
      <div className="card__buttons">
        <Button
          title={addedToCart ? 'Added' : 'Add to cart'}
          buttonUse="cart"
          onClick={addedToCart ? removeFromCart : addToCart}
          added={addedToCart}
        />
        <Icon
          iconType="favorite"
          iconUse="button"
          iconSize="40"
          border={true}
          onClick={addedToFavorites ? removeFromFavorites : addToFavorites}
          added={addedToFavorites}
        />
      </div>
    </div>
  );
};
