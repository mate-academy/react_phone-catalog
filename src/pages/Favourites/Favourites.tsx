import React, { useContext, useEffect, useState } from 'react';
import { FavouriteContext } from '../../context/FavouriteProvider';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';
import { SearchIn } from '../../components/SearchIn';
import { NoResults } from '../../components/NoResults';
import './Favourites.scss';

export const Favourites: React.FC = () => {
  const { favorites } = useContext(FavouriteContext);

  const [visibleProducts, setVisibleProducts] = useState(favorites);

  const searchProducts = (query: string) => {
    if (query) {
      const lowerQuery = query.toLowerCase();

      setVisibleProducts([...favorites].filter(
        product => product.name.toLowerCase().includes(lowerQuery),
      ));
    } else {
      setVisibleProducts(favorites);
    }
  };

  useEffect(() => {
    setVisibleProducts(favorites);
  }, [favorites]);

  return (
    <div className="Favourites">
      <SearchIn activePage="favorites" searchProducts={searchProducts} />
      {!visibleProducts.length ? (
        <NoResults category="The item you requested was" />
      ) : (
        <>
          <BreadCrumbs
            url="/favorites"
            page="Favourites"
            title=""
          />
          <h1 className="ProductPage__title">Favourites</h1>
          <p className="ProductPage__numberOfModels">
            {visibleProducts.length}
            {' '}
            models
          </p>
          <div className="Favourites__list">
            {visibleProducts.map(product => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
