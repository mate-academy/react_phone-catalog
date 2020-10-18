import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from '../ProductCard/ProductCard';

export const FavoritesPage = ({ products }) => {
  const favourites = useSelector(state => state.liked.items);
  const [favProducts, setFavProducts] = useState([]);

  useEffect(() => {
    setFavProducts(products.filter(product => favourites.includes(product.id)));
  }, [favourites])

  return (
    <>
      <section className="store">
        <h1 className="store__title">Favourites</h1>
        <div className="store__inner">
          {favProducts.map(product => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  )
}