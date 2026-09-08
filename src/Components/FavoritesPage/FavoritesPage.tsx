import './FavoritesPage.scss';
import { NavLink } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { GetProducts } from '../../services/GetProducts';
import { useFavorites } from '../../context/favoritesContext';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    GetProducts().then(data => {
      setProducts(data);
    });
  }, []);

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.itemId),
  );

  return (
    <>
      <div className="favorites__page">
        <nav className="favorites__nav-links">
          <NavLink to={'/'}>
            <img
              className="favorites__nav-link"
              src="img/ui-kit/Home.png"
              alt="home"
            />
          </NavLink>
          <img
            className="favorites__nav-link"
            src="img/ui-kit/chevron-arrow-right.png"
            alt="to-right"
          />
          <p className="favorites__nav-link">favorites</p>
        </nav>

        <h1 className="favorites__page-title">Favorites</h1>
        <h3 className="favorites__page-models">
          {favoriteProducts.length} models
        </h3>

        <div className="favorites-catalog">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <>
              <p className="favorites-empty">Favorites list is empty</p>
              <div className="favorites-empty-photo-wrapper">
                <img
                  className="favorites-empty-photo"
                  src="img/cart-is-empty.png"
                  alt="favorites empty"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
