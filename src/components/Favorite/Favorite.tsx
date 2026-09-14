import { Breadcrumbs } from '../Breadcrumbs';
import { ProductCard } from '../ProductCard';
import { Title } from '../../types/Titel';
import './Favorite.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { useProducts } from '../../context/ProductsContext';
export const Favorite: React.FC = () => {
  const { favorites } = useFavorites();
  const { products } = useProducts();
  const favoriteProducts = products.filter(product =>
    favorites.includes(product.itemId),
  );

  return (
    <div className="wrapper">
      <div className="container">
        <Breadcrumbs />
        <div className="titel-favorite">
          <h3 className="titel-favorite--item">Favourites</h3>
          <p className="titel-favorite--text">{favorites.length} items</p>
        </div>
        {favoriteProducts.map(item => (
          <ProductCard titel={Title.Space} key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};
