import React, { useState, useEffect } from 'react';
import { Accessories as AccessoriesType } from '../../Types/Accessories';

import { useCartContext } from '../../CartContext/CartContext';
import { Link, useLocation } from 'react-router-dom';
import './Accessories.scss';

export const Accessories: React.FC = () => {
  const [accessories, setAccessories] = useState<AccessoriesType[]>([]);
  // prettier-ignore
  const [filteredAccessories, setFilteredAccessories] = useState<
  AccessoriesType[]
  >([]);
  const { addToCart, addToFavorites } = useCartContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch('/api/accessories.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phones');
        }

        const data = await response.json();

        setAccessories(data);
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

    fetchAccessories();
  }, []);

  useEffect(() => {
    setFilteredAccessories(
      accessories.filter(accessory =>
        accessory.name.toLowerCase().includes(searchQuery),
      ),
    );
  }, [searchQuery, accessories]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="accessories-header">
        {filteredAccessories.length} Accessories Available
      </h2>
      <div className="accessories-list">
        {filteredAccessories.map(accessory => (
          <div key={accessory.id} className="accessories-card a">
            <Link to={`/accessories/${accessory.id}`}>
              <img
                src={accessory.images[0]}
                alt={accessory.name}
                className="accessories-image"
              />
              <div className="accessories-info">
                <h3 className="accessories-name">{accessory.name}</h3>
                <p className="accessories-price">${accessory.priceDiscount}</p>
                <p className="phone-card__detail">
                  <span>Screen</span> <span>{accessory.screen}</span>
                </p>
                <p className="phone-card__detail">
                  <span>Capacity</span> <span>{accessory.capacity}</span>
                </p>
                <p className="phone-card__detail">
                  <span>RAM</span> <span>{accessory.ram}</span>
                </p>
              </div>
            </Link>
            <div className="accessories-card__actions">
              <button
                className="btn btn-primary"
                onClick={() => addToCart(accessory)}
              >
                Add to cart
              </button>
              <button
                className="btn btn-favorite"
                onClick={() => addToFavorites(accessory)}
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
