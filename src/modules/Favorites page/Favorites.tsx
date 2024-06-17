import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { PhoneCard } from '../Home page/components/PhoneCard/PhoneCard';
import './Favorites.scss';

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/favorites.json');
      const data: ProductType[] = await response.json();

      setFavorites(data);
      localStorage.setItem('favorites', JSON.stringify(data));
    };

    const isValidStoredData = (data: string | null) => {
      return data && JSON.parse(data).length > 0;
    };

    const storedFavorites = localStorage.getItem('favorites');

    if (isValidStoredData(storedFavorites)) {
      setFavorites(JSON.parse(storedFavorites as string));
    } else {
      fetchData();
    }
  }, []);

  return (
    <section className="favorites container">
      <div className="product__history">
        <Link to="/" className="product__link">
          <img src="../../../img/links/home.svg" alt="home" />
        </Link>
        <img
          src="../../../img/links/chevron (arrow right).svg"
          alt="chevron_right"
        />
        <Link to={`/favorites`} className="product__link">
          Favorites
        </Link>
      </div>

      <h1 className="product__title">Favorites</h1>
      <p className="product__description">{favorites.length} items</p>

      <div className="product__all">
        {favorites.map(product => (
          <PhoneCard key={product.id} product={product} isHot={true} />
        ))}
      </div>
    </section>
  );
};
