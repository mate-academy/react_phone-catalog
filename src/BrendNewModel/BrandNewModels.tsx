import React, { useState, useEffect, useCallback } from 'react';
import '../BrendNewModel/BrandNewModels.scss';
import { Phone } from '../Types/BaseItem';
import { useCartContext } from '../CartContext/useCartContext';
import { Link } from 'react-router-dom';
const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

type BrandNewModelsProps = {
  hideTitle?: boolean;
};

export const BrandNewModels: React.FC<BrandNewModelsProps> = ({
  hideTitle,
}) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { addToCart, addToFavorites } = useCartContext();
  const [phonesPerPage, setPhonesPerPage] = useState(4);

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
        const response = await fetch('./api/phones.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phones');
        }

        const data = await response.json();

        setPhones(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPhonesPerPage(1);
      } else {
        setPhonesPerPage(4);
      }
    };

    handleResize();
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="brand-new-models">
      <div className="brand-new-models-header">
        {!hideTitle && (
          <h2 className="brand-new-models__title">Brand new models</h2>
        )}
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
      <div
        className={`brand-new-models_phonelist ${isAnimating ? `slide-${direction}` : ''}`}
      >
        {visiblePhones.map((phone: Phone) => (
          <div
            key={phone.id}
            className="brand-new-models_phone-card a"
          >
            <Link to={`/phones/${phone.id}`}>
              <img
                src={phone.images[0]}
                alt={phone.name}
                className="brand-new-models_phone-card__image"
              />
              <div className="brand-new-models_phone-info">
                <h3 className="brand-new-models_phone-card__name">
                  {phone.name}
                </h3>
                <p className="brand-new-models_phonecard__price">
                  ${phone.priceDiscount}
                </p>
                <p className="brand-new-models_phone-card__detail">
                  <span>Screen</span> <span>{phone.screen}</span>
                </p>
                <p className="brand-new-models_phone-card__detail">
                  <span>Capacity</span> <span>{phone.capacity}</span>
                </p>
                <p className="brand-new-models_phone-card__detail">
                  <span>RAM</span> <span>{phone.ram}</span>
                </p>
              </div>
            </Link>
            <div className="brand-new-models_phone-card__actions">
              <button
                className={`brand-new-models_phone-card__actions__btn-primary ${
                  addToCartIds.has(phone.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(phone)}
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
    </div>
  );
};
