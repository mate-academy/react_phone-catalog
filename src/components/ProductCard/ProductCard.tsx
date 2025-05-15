import './ProductCard.scss';
import React from 'react';
import { LuHeart } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { addToCart } from '../../features/cart';
import { addToFavorites, removeFromFavorites } from '../../features/favorites';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
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
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    //console.log('Added to cart:', product);
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
    //history.push("/favorites");
    //console.log('Added to favorites:', product);
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(product));
    //history.push("/favorites");
    //console.log('Added to favorites:', product);
  };

  return (
    <div className="product__card" >
      <div className="card-image">
        {/* <figure className="image"> */}
        <img src={image} alt="Product photo" />
        {/* </figure> */}
      </div>

      <div className="card-content">
        {/* <div className="media-content "> */}
        <h2 className="title ">{name}</h2>
        <p className="product__price">
          <span className="new__price">${price}</span>
          <span className="old__price">${fullPrice}</span>
        </p>
        <hr />
        <p className="product__info">
          <span className="feature">Screen:</span>
          <span className="feature__info">{screen}</span>
        </p>
        <p className="product__info">
          <span className="feature">Capacity:</span>
          <span className="feature__info">{capacity}</span>
        </p>
        <p className="product__info">
          <span className="feature">RAM:</span>
          <span className="feature__info">{ram}</span>
        </p>
        {/* </div> */}

        <div className="buttons">
          {isInCart ? (
            <button className="addButton" onClick={handleAddToCart}>
              Added to cart
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
