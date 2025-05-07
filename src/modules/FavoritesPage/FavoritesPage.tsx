import { Breadcrumbs } from '../shared/Breadcrumbs';
import { GoToBack } from '../shared/GoToBack';
import { Favorites } from './components/Favorites';

export const FavoritesPage = () => {
  return (
    <>
      <Breadcrumbs />
      <GoToBack />
      <Favorites />
    </>
  );
};
