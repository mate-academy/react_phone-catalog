import React, { useState, useEffect } from 'react';
import { Tablet } from '../../Types/Tablet';
import { useCartContext } from '../../CartContext/CartContext';
import { Link, useLocation } from 'react-router-dom';
import './Tablet.scss';

export const Tablets: React.FC = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);
  const { addToCart, addToFavorites } = useCartContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const response = await fetch('/api/tablets.json');

        if (!response.ok) {
          throw new Error('Failed to fetch tablets');
        }

        const data: Tablet[] = await response.json();

        setTablets(data);
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

    fetchTablets();
  }, []);

  useEffect(() => {
    setFilteredTablets(
      tablets.filter(tablet => tablet.name.toLowerCase().includes(searchQuery)),
    );
  }, [searchQuery, tablets]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="tablets-header">
        {filteredTablets.length} Tablets Available
      </h2>
      <div className="tablet-list">
        {filteredTablets.map((tablet: Tablet) => (
          <div key={tablet.id} className="tablet-card a">
            <Link to={`/tablets/${tablet.id}`}>
              <img
                src={tablet.images[0]}
                alt={tablet.name}
                className="tablet-image"
              />
              <div className="tablet-info">
                <h3 className="tablet-cardname">{tablet.name}</h3>
                <p className="tabletcardprice">${tablet.priceDiscount}</p>
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
                className="btn btn-primary"
                onClick={() => addToCart(tablet)}
              >
                Add to cart
              </button>
              <button
                className="btn btn-favorite"
                onClick={() => addToFavorites(tablet)}
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
