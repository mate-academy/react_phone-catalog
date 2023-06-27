import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  return (
    <div className="favorites">
      <Breadcrumbs />
      <h1 className="favorites__title">Favorites</h1>

      <p className="favorites__count">5 items</p>
    </div>
  );
};
