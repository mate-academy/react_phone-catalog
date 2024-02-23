import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalogue } from '../../components/Catalogue';
import { Product } from '../../store/models/product';
import './Favorites.scss';

interface Props {
  favorites: Product[],
}

export const FavoritesView: React.FC<Props> = ({ favorites }) => (
  <div className="favorites">
    <div className="favorites__top-container">
      <Breadcrumbs />
      <h1 className="favorites__title">Favorites</h1>
      <BackButton />
    </div>
    <Catalogue items={favorites} />
  </div>

);
