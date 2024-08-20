import './ProductCard.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favoritesSlice';
import { Product } from '../../types/Product';
import { AddButton } from '../AddButton';
import { RoundButton } from '../RoundButton';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    image,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    itemId,
    category,
  } = product;

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isProductInFavorites, setIsProductInFavorites] = useState(false);

  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);
  const { favorites } = useAppSelector(state => state.favorites);

  const handleFavoritesAction = () => {
    if (isProductInFavorites) {
      dispatch(removeFromFavorites(itemId));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleCartAction = () => {
    if (isProductInCart) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(addToCart(product));
    }
  };

  useEffect(() => {
    setIsProductInCart(cart.some(item => item.itemId === itemId));
    setIsProductInFavorites(favorites.some(item => item.itemId === itemId));
  }, [cart, favorites, itemId]);

  return (
    <div className="product-card">
      <NavLink to={`/${category}/${itemId}`} style={{ textDecoration: 'none' }}>
        <img className="product-image" src={image} alt="Product Image" />
        <p className="product-title">{name}</p>
      </NavLink>
      <div className="product-price">
        <p className="product-price--regular">${price}</p>
        <p className="product-price--discount">${fullPrice}</p>
      </div>
      <div className="product-card__divider" />
      <div className="product-description">
        <div className="product-description__field">
          <p className="product-description__name">Screen</p>
          <p className="product-description__value">{screen}</p>
        </div>
        <div className="product-description__field">
          <p className="product-description__name">Capacity</p>
          <p className="product-description__value">{capacity}</p>
        </div>
        <div className="product-description__field">
          <p className="product-description__name">RAM</p>
          <p className="product-description__value">{ram}</p>
        </div>
      </div>
      <div className="product-actions">
        <AddButton
          text={isProductInCart ? 'Added' : 'Add to cart'}
          onClick={handleCartAction}
        />
        <RoundButton
          buttonType={isProductInFavorites ? 'fav-filled' : 'fav'}
          onClick={handleFavoritesAction}
        />
      </div>
    </div>
  );
};
