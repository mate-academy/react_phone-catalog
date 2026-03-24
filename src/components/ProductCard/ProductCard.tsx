import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Phone, Tablet, Accessory } from '../../../public/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks'; // Твої типізовані хуки
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoritesSlice';
import './ProductCard.scss';

type ProductType = Phone | Tablet | Accessory;

interface ProductCardProps {
  product: Product | ProductType;
  showDiscount?: boolean;
  onRemove?: () => void; // Новий пропс для перехоплення видалення (для модалки)
}

function ProductCard({
  product,
  showDiscount = false,
  onRemove,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  // Отримуємо список обраного з Redux
  const favorites = useAppSelector(state => state.favorites.items);
  const isLiked = favorites.some(item => item.id === product.id);

  // Стан для кошика (потім теж перенесеш в Redux)
  const [added, setAdded] = useState(false);

  // Обробка кліку на сердечко
  const handleLikeClick = () => {
    if (isLiked) {
      if (onRemove) {
        // Якщо передано onRemove (ми на сторінці Favorites), відкриваємо модалку
        onRemove();
      } else {
        // Якщо ні (ми на головній), просто видаляємо
        dispatch(removeFromFavorites(product.id));
      }
    } else {
      // Додаємо в обране (передаємо весь об'єкт product як Product)
      dispatch(addToFavorites(product as Product));
    }
  };

  // Визначення ціни та зображення (твоя логіка)
  const price =
    'priceDiscount' in product ? product.priceDiscount : product.price;
  const fullPrice =
    'priceRegular' in product
      ? product.priceRegular
      : (product as Product).fullPrice;
  const image =
    'images' in product ? product.images[0] : (product as Product).image;

  return (
    <div className="product-card">
      <Link
        to={`/${product.category}/${product.id}`}
        className="product-image-link"
      >
        <img src={image} alt={product.name} className="product-image" />
      </Link>

      <Link
        to={`/${product.category}/${product.id}`}
        className="product-name-link"
      >
        <div className="product-name">{product.name}</div>
      </Link>

      <h3 className="product-price">
        <span className="discount">${price}</span>
        {showDiscount && <span className="full-price">${fullPrice}</span>}
      </h3>

      <hr />

      <div className="product-description">
        <div className="product-description__left">
          <div className="characteristic-name">Screen</div>
          <div className="characteristic-name">Capacity</div>
          <div className="characteristic-name">RAM</div>
        </div>
        <div className="product-description__right">
          <div className="characteristic-value">{product.screen}</div>
          <div className="characteristic-value">{product.capacity}</div>
          <div className="characteristic-value">{product.ram}</div>
        </div>
      </div>

      <div className="product-actions">
        <button
          className={`add-to-cart-button ${added ? 'added-to-cart' : ''}`}
          onClick={() => setAdded(prev => !prev)}
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`like-button ${isLiked ? 'is-liked' : ''}`}
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? '/img/HeartFilled.svg' : '/img/Like.svg'}
            alt="Like"
          />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
