import React, { useState, useEffect } from 'react';
import './HotPrices.scss';
import { Phone } from '../Types/Types';
import { useCartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';

export const HotPrices: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, addToFavorites } = useCartContext();
  const phonesPerPage = 4;

  useEffect(() => {
    const controller = new AbortController();
    const fetchPhones = async () => {
      try {
        const response = await fetch('/api/phones.json', {
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

  const handleNext = () => {
    if (startIndex + phonesPerPage < phones.length) {
      setStartIndex(startIndex + phonesPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - phonesPerPage >= 0) {
      setStartIndex(startIndex - phonesPerPage);
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
    <div className="hot-prices">
      <h2 className="hot-prices__title">Hot Prices</h2>
      <div className="phonelist">
        {visiblePhones.map((phone: Phone) => (
          <div key={phone.id} className="phonecard a">
            <Link to={`/phones/${phone.id}`}>
              <img
                src={phone.images[0]}
                alt={phone.name}
                className="phone-cardimage"
              />
              <div className="phone-info">
                <h3 className="phone-cardname">{phone.name}</h3>
                <span className="phone-card__price--new">
                  ${phone.priceDiscount}
                </span>
                <span className="phone-card__price--old">
                  ${phone.priceRegular}
                </span>
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
                className="btn btn-primary"
                onClick={() => addToCart(phone)}
              >
                Add to cart
              </button>
              <button
                className="btn btn-favorite"
                onClick={() => addToFavorites(phone)}
              >
                ♥
              </button>
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
          Previous
        </button>
        <button
          className="pagination__button"
          onClick={handleNext}
          disabled={startIndex + phonesPerPage >= phones.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};
