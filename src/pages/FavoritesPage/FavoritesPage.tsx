import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './FavoritesPage.scss';

import { ProductsList } from '../../components/ProductsList/ProductsList';
import { ProductsContext } from '../../helpers/ProductContext';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(ProductsContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';
  let filteredProducts;

  if (searchQuery) {
    filteredProducts = favorites
      .filter(product => ((product.name && product.id)
    && (product.name.toLowerCase().includes(searchQuery)
      || product.id.toLowerCase().includes(searchQuery)
    )
      ));
  } else {
    filteredProducts = favorites;
  }

  return (
    <div className="favorites-page">
      {favorites.length === 0
        ? (
          <div className="title-container">
            <h1 className="title-not-found">No favorites items</h1>
          </div>
        )
        : (
          <div className="favorites-page-wrapper">
            <i className="fa-solid fa-house icon" />
            <i className="fa-solid fa-angle-right icon" />
            <span className="icon-title">Favorites</span>
            <div className="header-container">
              <h1 className="favorites-title">Favorites</h1>
              <p className="favorites-quantity-title">{`${favorites.length} items`}</p>
            </div>
            <div
              className="products-list-container"
              data-cy="productList"
            >
              <div className="products-list">
                <ProductsList products={filteredProducts} />
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
