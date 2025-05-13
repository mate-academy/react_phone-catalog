import React, { useState, useEffect } from 'react';
import '../BrendNewModel/BrandNewModels.scss';
import { Phone } from '../Types/BaseItem';
import { useCartContext } from '../CartContext/useCartContext';
import { Link } from 'react-router-dom';

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
  const { addToCart, addToFavorites } = useCartContext();
  const [phonesPerPage, setPhonesPerPage] = useState(4);

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
      }, 500); // тривалість анімації у ms
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
      {!hideTitle && (
        <h2 className="brand-new-models__title">Brand new models</h2>
      )}
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
                className="brand-new-models_phone-card__actions__btn-primary"
                onClick={() => addToCart(phone)}
              >
                Add to cart
              </button>
              <img
                onClick={() => addToFavorites(phone)}
                className="brand-new-models_phone-card__actions__btn-favorite"
                src="./img/AddFavor.png"
                alt="AddFavor"
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
