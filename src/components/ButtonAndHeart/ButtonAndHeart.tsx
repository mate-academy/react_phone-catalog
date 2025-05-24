//import React from 'react';
import { LuHeart } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { addToCart } from '../../features/cart';
import { addToFavorites, removeFromFavorites } from '../../features/favorites';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { removeFromCart } from '../../features/cart';
interface ButtonAndHeartProps {
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  category: string;
  itemId: string;
}
export const ButtonAndHeart: React.FC<ButtonAndHeartProps> = ({
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
}) => {
  const dispatch = useDispatch();

  const product = { image, name, price, fullPrice, screen, capacity, ram };
  const isInFavorites = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some(item => item.name === product.name),
  );

  const isInCart = useSelector((state: RootState) =>
    state.cart.cartItems.some(item => item.name === product.name),
  );

  const handleRemoveFromCart = (cartItem: string) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(product));
  };

  return (
    <div className="buttons">
      {isInCart ? (
        <button
          className="addButton selected"
          onClick={() => handleRemoveFromCart(product)}
        >
          Selected
        </button>
      ) : (
        <button className="addButton" onClick={handleAddToCart}>
          Add to cart
        </button>
      )}
      {isInFavorites ? (
        <button
          className="icon icon__heart"
          onClick={handleRemoveFromFavorites}
        >
          <LuHeart style={{ fill: 'red', stroke: 'red' }} />
        </button>
      ) : (
        <button className="icon icon__heart" onClick={handleAddToFavorites}>
          <LuHeart />
        </button>
      )}
    </div>
  );
};
