/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavourites } from '../../state/favouriteSlice';
import { fetchProducts } from '../../state/productsSlice';
import { Loader } from '../../components/Loader';
import { RootState, AppDispatch } from '../../state/store';
import { PhoneCard } from '../../components/PhoneCard/PhoneCard';
import { Link } from 'react-router-dom';
import './Favourites.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const FavouriteProducts: React.FC = () => {
  const favouriteProducts = useSelector(selectFavourites);
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    favouriteProducts.includes(product.id),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {filteredProducts.length > 0 ? (
        <>
          <div className="favourite">
            <div className="favourite__path">
              <BreadCrumbs />
            </div>
            <h1 className="favourite__title">Favourites</h1>
            <p className="favourite__counter">
              {filteredProducts.length} models
            </p>
            <div className="favourite__phones">
              {filteredProducts.map(product => (
                <Link to={`/phones/${product.itemId}`} key={product.id}>
                  <PhoneCard product={product} />
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="favourite__empty">No favourite products yet</p>
      )}
    </div>
  );
};
