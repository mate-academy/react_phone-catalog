import React, { useState, useEffect, useCallback } from 'react';
import { Phone } from '../../Types/BaseItem';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../CartContext/useCartContext';
import './PhoneDetails.scss';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

export const PhoneList: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount] = useState(4);
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
    (phone: Phone) => {
      const isInFavorites = favorites.some((fav) => fav.id === phone.id);

      if (isInFavorites) {
        removeFromFavorites(phone.id);
        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(phone.id);
          return updated;
        });
      } else {
        addToFavorites(phone);
        setFavoriteIds((prev) => new Set(prev).add(phone.id));
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  const toggleToCart = useCallback(
    (phone: Phone) => {
      const isInCart = cart.some((cartItem) => cartItem.item.id === phone.id);

      if (isInCart) {
        removeFromCart(phone.id);
        setAddToCartIds((prev) => {
          const updated = new Set(prev);
          updated.delete(phone.id);
          return updated;
        });
      } else {
        addToCart(phone);
        setAddToCartIds((prev) => new Set(prev).add(phone.id));
      }
    },
    [cart, addToCart, removeFromCart],
  );

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const res = await fetch('./api/phones.json');
        if (!res.ok) throw new Error('Failed to fetch phones');
        const data = await res.json();
        setPhones(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhones();
  }, []);

  const handleNext = () => {
    if (startIndex + visibleCount < phones.length && !isAnimating) {
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

  const visiblePhones = phones.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="phone-slider">
      <div className="phone-slider__header">
        <h2>You may also like</h2>
        <div className="phone-slider__controls">
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
            disabled={startIndex + visibleCount >= phones.length}
          >
            <img
              src="./img/ChevronR.png"
              alt="Right"
            />
          </button>
        </div>
      </div>

      <div
        className={`phone-slider__list ${isAnimating ? `slide-${direction}` : ''}`}
      >
        {visiblePhones.map((phone) => (
          <div
            key={phone.id}
            className="phone-card"
          >
            <Link to={`/phones/${phone.id}`}>
              <img
                src={phone.images[0] || '/img/product-not-found.png'}
                alt={phone.name}
                className="phone-cardimage"
              />
              <div className="phone-info">
                <h3 className="phone-cardname">{phone.name}</h3>
                <div className="phone__price">
                  <span className="phone__price--new">
                    ${phone.priceDiscount}
                  </span>
                  <span className="phone__price--old">
                    ${phone.priceRegular}
                  </span>
                </div>
                <p className="phone-card__detail">
                  <span>Screen</span> <span>{phone.screen}</span>
                </p>
                <p className="phone-card__detail">
                  <span>Capacity</span> <span>{phone.capacity}</span>
                </p>
                <p className="phone-card__detail">
                  <span>RAM</span> <span>{phone.ram}</span>
                </p>
              </div>
            </Link>

            <div className="phone-card__actions">
              <button
                className={`phone-card__actions__btn-primary ${addToCartIds.has(phone.id) ? 'added' : ''}`}
                onClick={() => toggleToCart(phone)}
              >
                {addToCartIds.has(phone.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(phone)}
                className="phone-card__actions__btn-favorite"
                src={favoriteIds.has(phone.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
