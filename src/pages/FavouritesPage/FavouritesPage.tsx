import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './FavouritesPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../../components/ProductCard/ProductCard';
import { setSelectedProduct } from '../../store/slices/selectedProductSlice';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { RootState } from '../../store';

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favouriteProducts = useSelector(
    (state: RootState) => state.favouriteProducts,
  );

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites') || '[]';

    if (storedFavourites) {
      try {
        setFavourites(JSON.parse(storedFavourites));
      } catch (e) {
        console.error('Ошибка при разборе favourites из localStorage', e);
      }
    }
  }, [favouriteProducts]);

  const handleProductClick = (item: Product) => {
    dispatch(setSelectedProduct(item));
    navigate(`/${item.category}/${item.id}`);
  };

  if (!favourites.length) {
    return (
      <div className={styles.favouritesPage}>
        <Breadcrumb type="favourites" />
        <h1 className={styles.favouritesPage__title}>Favourites</h1>
        <p className={styles.favouritesPage__model}> 0 Models</p>
      </div>
    );
  } else {
    return (
      <div className={styles.favouritesPage}>
        <Breadcrumb type="favourites" />
        <h1 className={styles.favouritesPage__title}>Favourites</h1>
        <p className={styles.favouritesPage__model}>
          {favourites?.length} Models
        </p>
        <div className={styles.favouritesPage__products}>
          {favourites.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onClick={() => handleProductClick(item)}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default FavouritesPage;
