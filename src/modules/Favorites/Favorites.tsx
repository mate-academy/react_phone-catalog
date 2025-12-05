import React from 'react';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { useCart } from '../CartFavContext/CartContext';
import SliderItem from '../shared/components/SliderItem/SliderItem';
import styles from './Favorites.module.scss';

const Favorites: React.FC = () => {
  const { favorites } = useCart();

  console.log(favorites);

  return (
    <div className={styles.favoritesPage_container}>
      <PageHeader title="Favourites" showBreadCrumbs variant="favPage" />
      <div className={styles.favorites__container}>
        {favorites.map(fav => (
          <SliderItem key={fav.id} item={fav} showDiscount={false} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
