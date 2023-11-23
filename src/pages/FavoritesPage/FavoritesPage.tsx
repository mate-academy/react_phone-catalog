import { useEffect } from 'react';
import { useAppSelector } from '../../features/hooks';
import ProductsList from '../../components/ProductsList/ProductsList';
// import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import './FavoritesPage.scss';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

type Props = {
  title: string;
};

const FavoritesPage:React.FC<Props> = () => {
  const favorites = useAppSelector(state => state.favorites.items);

  useEffect(() => {
  });

  return (
    <section className="favorites main__section">
      {favorites.length <= 0 ? (
        <>
          <NotFoundPage title="Favorites not found" />
        </>
      ) : (
        <div className="favorites__conteiner">
          <ProductsList products={favorites} title="Favorites" />
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
