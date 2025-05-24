import './ProductCard.scss';
import React from 'react';
import { LuHeart } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart';
import { addToFavorites, removeFromFavorites } from '../../features/favorites';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { removeFromCart } from '../../features/cart';
import { NavLink } from 'react-router-dom';
interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  itemId: string;
  category: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  itemId,
  category,
}) => {
  const dispatch = useDispatch();

  const product = {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId,
    category,
  };
  const isInFavorites = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some(item => item.name === product.name),
  );

  const isInCart = useSelector((state: RootState) =>
    state.cart.cartItems.some(item => item.name === product.name),
  );
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(product));
  };

  const handleRemoveFromCart = (cartItem: string) => {
    dispatch(removeFromCart(cartItem));
  };

  return (
    <div className="product__card">
      <NavLink
        to={`/${product.category}/${product.itemId}`}
        className="card-image"
      >
        <img src={`.${image}`} alt="Product photo" />
      </NavLink>

      <div className="card-content">
        <h2 className="title ">{name}</h2>
        <p className="product__price">
          <span className="new__price">${price}</span>
          <span className="old__price">${fullPrice}</span>
        </p>

        <div className="card__tech__spec">
          {[
            { label: 'Screen', key: 'screen' },
            { label: 'Capacity', key: 'capacity' },
            { label: 'RAM', key: 'ram' },
          ].map(({ label, key }) => {
            const value = product[key as keyof typeof product];

            return value ? (
              <div className="product__info" key={key}>
                <span className="feature">{label}:</span>
                <span className="feature__info">{value}</span>
              </div>
            ) : null;
          })}
        </div>

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
      </div>
    </div>
  );
};
