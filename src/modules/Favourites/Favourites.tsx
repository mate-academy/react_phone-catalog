import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import scss from './Favourites.module.scss';

export const Favourites = () => {
  return (
    <div className={scss.favourites}>
      <Breadcrumbs page="Favourites" />
      <h1>Favourites</h1>
    </div>
  );
};
