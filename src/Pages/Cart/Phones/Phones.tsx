import React, { useState, useEffect } from 'react';
import { Phone } from '../../../Types/Types';
import './Phones.scss';
import { useCartContext } from '../../../CartContext/CartContext';
import { Link, useLocation } from 'react-router-dom';

export const Phones: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const { addToCart, addToFavorites } = useCartContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        // eslint-disable-next-line no-console
        console.log('Fetching phones...');
        const response = await fetch('./api/phones.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phones');
        }

        const data: Phone[] = await response.json();

        setPhones(data);
        // eslint-disable-next-line no-console
        console.log('Phones loaded:', data);
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
    setFilteredPhones(
      phones.filter(phone => phone.name.toLowerCase().includes(searchQuery)),
    );
  }, [searchQuery, phones]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="phones-header">{phones.length} Phones Available</h2>
      <div className="phone-list">
        {filteredPhones.map((phone: Phone) => (
          <div key={phone.id} className="phone-card a">
            <Link to={`/phones/${phone.id}`}>
              <img
                src={phone.images?.[0] || '/img/product-not-found.png'}
                alt={phone.name}
                className="phone-cardimage"
              />
              <div className="phone-info">
                <h3 className="phone-cardname">{phone.name}</h3>
                <p className="phonecardprice">${phone.priceDiscount}</p>
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
    </div>
  );
};
