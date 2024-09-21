import { useContext, useState, useEffect } from 'react';
// eslint-disable-next-line max-len
import {
  StatesContext,
  DispatchContext,
} from '../../../store/GlobalStateProvider';
import { ProductSummary } from '../../../types/ProductSummary';
import { Button } from '../Button/Button.component';
import { Icon } from '../Icon/Icon.component';

type Props = {
  product: ProductSummary;
};

export const CardButtons: React.FC<Props> = ({ product }) => {
  const { cart, favorites } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const addToCart = () => {
    dispatch({
      type: 'updateCart',
      payload: [...cart, { ...product, quantity: 1 }],
    });
  };

  const removeFromCart = () => {
    dispatch({
      type: 'updateCart',
      payload: [...cart.filter(p => p.itemId !== product.itemId)],
    });
  };

  const addToFavorites = () => {
    dispatch({ type: 'updateFavorites', payload: [...favorites, product] });
  };

  const removeFromFavorites = () => {
    dispatch({
      type: 'updateFavorites',
      payload: [...favorites.filter(p => p.itemId !== product.itemId)],
    });
  };

  useEffect(() => {
    setIsFavorited(!!favorites.find(p => p.itemId === product.itemId));
  }, [favorites, product]);

  useEffect(() => {
    setIsAddedToCart(!!cart.find(p => p.itemId === product.itemId));
  }, [cart, product]);

  return (
    <div className="cardButtons">
      <Button
        title={isAddedToCart ? 'Added' : 'Add to cart'}
        buttonUse="cart"
        onClick={isAddedToCart ? removeFromCart : addToCart}
        added={isAddedToCart}
      />
      <Icon
        iconType="favorite"
        iconUse="button"
        iconSize="40"
        border={true}
        onClick={isFavorited ? removeFromFavorites : addToFavorites}
        added={isFavorited}
      />
    </div>
  );
};
