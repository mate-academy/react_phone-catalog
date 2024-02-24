import { memo } from 'react';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalogue } from '../../components/Catalogue';
import { FavoritesViewProps } from './types';
import './Favorites.scss';

export const FavoritesView = memo<FavoritesViewProps>(({ favorites }) => (
  <div className="favorites">
    <div className="favorites__top-container">
      <Breadcrumbs />
      <h1 className="favorites__title">Favorites</h1>
      <BackButton />
    </div>
    <Catalogue items={favorites} />
  </div>
));
