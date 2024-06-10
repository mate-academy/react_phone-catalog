import Heading from '../../UI/Heading/Heading';
import s from './FavoritesPage.module.css';
import { useProductStore } from '../../store/store';
import ProductsList from '../shared/ProductsList/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';

const FavoritesPage = () => {
  const favorites = useProductStore(state => state.favorites);
  return (
    <div className="container">
       <Breadcrumbs />
      <Heading as="h1" className={s.title}>Favorites</Heading>
      <p className={s.categoryModels}>{`${favorites.length} models`}</p>
      <ProductsList
       products={favorites}
      //  isChangingPage={isChangingPage}
     />
    </div>
  );
};

export default FavoritesPage;
