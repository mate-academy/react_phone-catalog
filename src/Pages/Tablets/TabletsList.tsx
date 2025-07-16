import React, { useState, useEffect, useCallback } from 'react';
import { Tablet } from '../../Types/BaseItem';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../CartContext/useCartContext';
import './Tablet.scss';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

type Props = {
  hideTitle?: boolean;
  limit?: number;
};

export const TabletList: React.FC<Props> = ({
  hideTitle = false,
  limit = 4,
}) => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
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
    const storedCartIds = localStorage.getItem('addToCartIds');
    const storedFavIds = localStorage.getItem('favoriteIds');

    if (storedCartIds) {
      setAddToCartIds(new Set(JSON.parse(storedCartIds)));
    }
    if (storedFavIds) {
      setFavoriteIds(new Set(JSON.parse(storedFavIds)));
    }
  }, []);

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

  const toggleFavorite = useCallback(
    (tablet: Tablet) => {
      const isInFavorites = favorites.some((fav) => fav.id === tablet.id);

      if (isInFavorites) {
        removeFromFavorites(tablet.id);
        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(tablet.id);
          return updated;
        });
      } else {
        addToFavorites(tablet);
        setFavoriteIds((prev) => new Set(prev).add(tablet.id));
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  const toggleToCart = useCallback(
    (tablet: Tablet) => {
      const isInCart = cart.some((cartItem) => cartItem.item.id === tablet.id);

      if (isInCart) {
        removeFromCart(tablet.id);
        setAddToCartIds((prev) => {
          const updated = new Set(prev);
          updated.delete(tablet.id);
          return updated;
        });
      } else {
        addToCart(tablet);
        setAddToCartIds((prev) => new Set(prev).add(tablet.id));
      }
    },
    [cart, addToCart, removeFromCart],
  );

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const res = await fetch('./api/tablets.json');
        if (!res.ok) throw new Error('Failed to fetch tablets');
        const data = await res.json();
        setTablets(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTablets();
  }, []);

  const handleNext = () => {
    if (startIndex + visibleCount < tablets.length && !isAnimating) {
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

  const visibleTablets = tablets.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="tablet-slider">
      {!hideTitle && <h2>Tablets</h2>}
      <div className="tablet-slider__header">
        <h2 className="tablet-slider__title">You may also like</h2>
        <div className="tablet-slider__controls">
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
            disabled={startIndex + visibleCount >= tablets.length}
          >
            <img
              src="./img/ChevronR.png"
              alt="Right"
            />
          </button>
        </div>
      </div>

      <div
        className={`tablet-slider__list ${isAnimating ? `slide-${direction}` : ''}`}
      >
        {visibleTablets.map((tablet) => (
          <div
            key={tablet.id}
            className="tablet-card a"
          >
            <Link to={`/tablets/${tablet.id}`}>
              <img
                src={tablet.images[0]}
                alt={tablet.name}
                className="tablet-image"
              />
              <div className="tablet-info">
                <h3 className="tablet-cardname">{tablet.name}</h3>
                <span className="tablet-price-discount">
                  ${tablet.priceDiscount}
                </span>{' '}
                {tablet.priceRegular &&
                  tablet.priceRegular !== tablet.priceDiscount && (
                    <span className="tablet-price-regular">
                      ${tablet.priceRegular}
                    </span>
                  )}
                <p className="tablet-card__detail">
                  <span>Screen</span> <span>{tablet.screen}</span>
                </p>
                <p className="tablet-card__detail">
                  <span>Capacity</span> <span>{tablet.capacity}</span>
                </p>
                <p className="tablet-card__detail">
                  <span>RAM</span> <span>{tablet.ram}</span>
                </p>
              </div>
            </Link>
            <div className="tablet-card__actions">
              <button
                className={`tablet-card__actions__btn-primary ${
                  addToCartIds.has(tablet.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(tablet)}
              >
                {addToCartIds.has(tablet.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(tablet)}
                className="tablet-card__actions__btn-favorite"
                src={favoriteIds.has(tablet.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
