import Heading from '../../UI/Heading/Heading';
import s from './FavoritesPage.module.css';
import { useProductStore } from '../../store/store';
import ProductsList from '../shared/ProductsList/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const [isChangingPage, setIsChangingPage] = useState(false);

  const favorites = useProductStore(state => state.favorites);

  const handleLoadCard = () => {
    setIsChangingPage(true);
    setTimeout(() => {
      setIsChangingPage(false);
    }, 800);
  };

  useEffect(() => {
    handleLoadCard();
  }, []);

  return (
    <div className={s.content}>
      <div className="container">
        <Breadcrumbs />
        <Heading as="h1" className={s.title}>
          Favorites
        </Heading>
        <p className={s.quantity}>{`${favorites.length} models`}</p>
        <ProductsList products={favorites} isChangingPage={isChangingPage} />
      </div>
    </div>
  );
};

export default FavoritesPage;
