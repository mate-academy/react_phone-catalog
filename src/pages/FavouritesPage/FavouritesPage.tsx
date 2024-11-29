import { useSelector } from 'react-redux';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ResponsiveHeader } from '../../components/ResponsiveHeader';
import { RootState } from '../../app/store';
import { ProductsList } from '../../components/ProductsList';

import './FavouritesPage.scss';

export const FavouritesPage: React.FC = () => {
  const favouritesItems = useSelector(
    (state: RootState) => state.favourites.items,
  );

  return (
    <div className="page">
      <Breadcrumbs />

      <div className="page__title">
        <ResponsiveHeader>Favourites</ResponsiveHeader>
      </div>

      <p className="page__subtitle text-gray">{`${favouritesItems.length} models`}</p>

      <ProductsList products={favouritesItems} />
    </div>
  );
};
