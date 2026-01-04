import './FavoritesPage.scss';
import Breadcrumbs from '../../components/ui/Breadcrumbs/Breadcrumbs';
import { useAppState } from '../../store/Store';
// eslint-disable-next-line max-len
import PreviewProductCard from '../../components/ui/PreviewProductCard/PreviewProductCard';

export default function FavoritesPage() {
  const { favorites, products } = useAppState();

  const favoriteProducts = products.filter(product =>
    favorites.includes(product.itemId),
  );

  return (
    <div className="FavoritesPage">
      <div className="FavoritesPage__breadcrumbs">
        <Breadcrumbs category="favorites" />
      </div>

      <h1 className="FavoritesPage__title">Favorites</h1>
      <div className="FavoritesPage__count">{favorites.length} items</div>

      <div className="FavoritesPage__products">
        {favoriteProducts.map(product => (
          <PreviewProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
