/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

// @ts-ignore
import home from '../../images/icons/Home.svg';
// @ts-ignore
import arrow from '../../images/icons/disable_arrow.png';

import './FavoritesPage.scss';
import { ProductList } from '../../components/ProductList/ProductList';

export const FavoritesPage: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const likedProducts: Product[] = JSON
      .parse(localStorage.getItem('LikedProducts') || '[]');

    setFavoriteProducts(likedProducts);
  }, [favoriteProducts]);

  return (
    <div className="favoritePage">
      <div className="favoritePage__header">
        <Link to="/">
          <img
            src={home}
            alt="home"
            className="favoritePage__icons"
          />
        </Link>
        <img
          src={arrow}
          alt="arrow"
          className="favoritePage__icons"
        />
        <p className="favoritePage__currentPage">Favorites</p>
      </div>

      <h1 className="favoritePage__title">Favorites</h1>
      <p className="phonePage__modelCount">{`${favoriteProducts?.length} models`}</p>

      <ProductList products={favoriteProducts} />
    </div>
  );
};
