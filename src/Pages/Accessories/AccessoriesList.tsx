import React, { useState, useEffect, useCallback } from 'react';
import { Accessories } from '../../Types/BaseItem';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../CartContext/useCartContext';
import './Accessories.scss';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

type Props = {
  hideTitle?: boolean;
  limit?: number;
};

export const AccessoriesList: React.FC<Props> = ({
  hideTitle = false,
  limit = 4,
}) => {
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount] = useState(limit || 4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
  } = useCartContext();

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('favoriteIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const [addToCartIds, setAddToCartIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('addToCartIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(
      'addToCartIds',
      JSON.stringify(Array.from(addToCartIds)),
    );
  }, [addToCartIds]);

  useEffect(() => {
    localStorage.setItem(
      'favoriteIds',
      JSON.stringify(Array.from(favoriteIds)),
    );
  }, [favoriteIds]);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await fetch('./api/accessories.json');
        const data = await res.json();
        setAccessories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccessories();
  }, []);

  const toggleFavorite = useCallback(
    (item: Accessories) => {
      const isInFavorites = favorites.some((f) => f.id === item.id);

      if (isInFavorites) {
        removeFromFavorites(item.id);
        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(item.id);
          return updated;
        });
      } else {
        addToFavorites(item);
        setFavoriteIds((prev) => new Set(prev).add(item.id));
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  const toggleToCart = useCallback(
    (item: Accessories) => {
      const isInCart = cart.some((c) => c.item.id === item.id);

      if (isInCart) {
        removeFromCart(item.id);
        setAddToCartIds((prev) => {
          const updated = new Set(prev);
          updated.delete(item.id);
          return updated;
        });
      } else {
        addToCart(item);
        setAddToCartIds((prev) => new Set(prev).add(item.id));
      }
    },
    [cart, addToCart, removeFromCart],
  );

  const handleNext = () => {
    if (startIndex + visibleCount < accessories.length && !isAnimating) {
      setIsAnimating(true);
      setDirection('left');
      setTimeout(() => {
        setStartIndex((prev) => prev + visibleCount);
        setIsAnimating(false);
      }, 400);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection('right');
      setTimeout(() => {
        setStartIndex((prev) => prev - visibleCount);
        setIsAnimating(false);
      }, 400);
    }
  };

  const visibleItems = accessories.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="accessories-slider">
      {!hideTitle && <h2 className="accessories-slider__title">Accessories</h2>}

      <div className="accessories-slider__header">
        <h2 className="accessories-slider__title">You may also like</h2>
        <div className="accessories-slider__controls">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <img
              src="./img/ChevronL.png"
              alt="Left"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= accessories.length}
          >
            <img
              src="./img/ChevronR.png"
              alt="Right"
            />
          </button>
        </div>
      </div>

      <div
        className={`accessories-slider__list ${isAnimating ? `slide-${direction}` : ''}`}
      >
        {visibleItems.map((accessory) => (
          <div
            key={accessory.id}
            className="accessories-card a"
          >
            <Link to={`/accessories/${accessory.id}`}>
              <img
                src={accessory.images[0]}
                alt={accessory.name}
                className="accessories-image"
              />
              <div className="accessories-info">
                <h3 className="accessories-name">{accessory.name}</h3>
                <p className="accessories-price">${accessory.priceDiscount}</p>
                <p className="accessories-card__detail">
                  <span>Screen</span> <span>{accessory.screen}</span>
                </p>
                <p className="accessories-card__detail">
                  <span>Capacity</span> <span>{accessory.capacity}</span>
                </p>
                <p className="accessories-card__detail">
                  <span>RAM</span> <span>{accessory.ram}</span>
                </p>
              </div>
            </Link>
            <div className="accessories-card__actions">
              <button
                className={`accessories-card__actions__btn-primary ${
                  addToCartIds.has(accessory.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(accessory)}
              >
                {addToCartIds.has(accessory.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(accessory)}
                className="accessories-card__actions__btn-favorite"
                src={favoriteIds.has(accessory.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
