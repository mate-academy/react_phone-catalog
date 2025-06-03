import React, { useState, useEffect } from 'react';
import './HotPrices.scss';
import { Phone } from '../Types/BaseItem';
import { useCartContext } from '../CartContext/useCartContext';
import { Link } from 'react-router-dom';
import HeartEmpty from './../../public/img/AddFavor.png';
import HeartFilled from './../../public/img/AddFavorAct.png';

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, addToFavorites } = useCartContext();
  const [phonesPerPage, setPhonesPerPage] = useState(4);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [addToCartIds, setAddToCartIds] = useState<Set<string>>(new Set());

  const toggleFavorite = (phone: Phone) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(phone.id)) {
        newSet.delete(phone.id);
      } else {
        newSet.add(phone.id);
      }

      addToFavorites(phone); // якщо хочеш також зберігати глобально

      return newSet;
    });
  };

  const toggleToCart = (phone: Phone) => {
    setAddToCartIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(phone.id)) {
        newSet.delete(phone.id);
      } else {
        newSet.add(phone.id);
      }

      addToCart(phone); // якщо хочеш також зберігати глобально

      return newSet;
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchPhones = async () => {
      try {
        const response = await fetch('./api/phones.json', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch phones');
        }

        const data = await response.json();

        setPhones(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPhonesPerPage(1);
      } else {
        setPhonesPerPage(4);
      }
    };

    handleResize(); // Викликаємо одразу при першому рендері
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (startIndex + phonesPerPage < phones.length && !isAnimating) {
      setIsAnimating(true);
      setDirection('left');

      setTimeout(() => {
        setStartIndex((prev) => prev + phonesPerPage);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (startIndex - phonesPerPage >= 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection('right');

      setTimeout(() => {
        setStartIndex((prev) => prev - phonesPerPage);
        setIsAnimating(false);
      }, 500);
    }
  };

  const visiblePhones = phones.slice(startIndex, startIndex + phonesPerPage);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="hotPrices">
      <h2 className="hotPrices__title">Hot Prices</h2>
      <div
        className={`hotPricesPhoneList ${isAnimating ? `slide-${direction}` : ''}`}
      >
        {visiblePhones.map((phone: Phone) => (
          <div
            key={phone.id}
            className="hotPricesPhoneCard a"
          >
            <Link to={`/phones/${phone.id}`}>
              <img
                src={phone.images[0]}
                alt={phone.name}
                className="hotPricesPhoneCard__image"
              />
              <div className="hotPricesPhoneCard__info">
                <h3 className="hotPricesPhoneCard__name">{phone.name}</h3>
                <span className="hotPricesPhoneCard__price--new">
                  ${phone.priceDiscount}
                </span>
                <span className="hotPricesPhoneCard__price--old">
                  ${phone.priceRegular}
                </span>
                <p className="hotPricesPhoneCard__detail">
                  <span>Screen</span> <span>{phone.screen}</span>
                </p>
                <p className="hotPricesPhoneCard__detail">
                  <span>Capacity</span> <span>{phone.capacity}</span>
                </p>
                <p className="hotPricesPhoneCard__detail">
                  <span>RAM</span> <span>{phone.ram}</span>
                </p>
              </div>
            </Link>
            <div className="hotPricesPhoneCard__actions">
              <button
                className={`hotPricesPhoneCard__actions__btn-primary ${
                  addToCartIds.has(phone.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(phone)}
                disabled={addToCartIds.has(phone.id)}
              >
                {addToCartIds.has(phone.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(phone)}
                className="brand-new-models_phone-card__actions__btn-favorite"
                src={favoriteIds.has(phone.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination__button"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <img
            src="./img/ChevronL.png"
            alt="Left"
          />
        </button>
        <button
          className="pagination__button"
          onClick={handleNext}
          disabled={startIndex + phonesPerPage >= phones.length}
        >
          <img
            src="./img/ChevronR.png"
            alt="Right"
          />
        </button>
      </div>
    </div>
  );
};
