/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/productType';
import { ProductList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import './Favorites.scss';
import { CartItem } from '../../types/cartType';

type Props = {
  favorites: Product[],
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const Favorites: React.FC<Props> = ({
  favorites,
  setFavorites,
  cartItems,
  setCartItems,
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();
  const isSearchInFavorites = location.pathname.includes('favorites');
  const [visibleItems, setVisibleItems] = useState(favorites);

  useEffect(() => {
    const newVisibleItems = query
      ? [...favorites].filter(favorite => favorite.name.trim().toLowerCase().includes(query?.trim().toLowerCase()))
      : favorites;

    if (isSearchInFavorites) {
      setVisibleItems(newVisibleItems);
    }
  }, [favorites, isSearchInFavorites, query]);

  return (
    favorites.length
      ? (
        <div className="favorites">

          <div className="breadcrumbs-container">
            <Breadcrumbs />
          </div>

          <div className="favorites__description">
            <h1 className="favorites__description-title title">
              Favorites
            </h1>
            <p className="favorites__description-count items-count">{`${favorites.length} models`}</p>
          </div>

          {visibleItems.length > 0
            ? (
              <div className="product-list-container">
                <ProductList
                  products={visibleItems}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              </div>
            )
            : <h1 className="title" style={{ marginTop: '40px' }}>There is no results for this search</h1>}
        </div>
      )
      : <h1 className="title">Favorites not found</h1>
  );
};
