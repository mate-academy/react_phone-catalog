import { BreadCrumbs } from '../shared/componets/Breadcrumbs/Breadcrumbs';
import { ProductList } from '../shared/componets/ProductList/ProductList';
import { useFavorites } from '../shared/Utills/FavoritesContext';
import { useProducts } from '../shared/Utills/ProductContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { products } = useProducts();

  const favoriteProductToRender =
    products.products?.filter(product => {
      return favorites.includes(product.itemId);
    }) ?? [];

  return (
    <div className={styles.favorite__page}>
      <BreadCrumbs />

      <div className={styles.favorite__page__desc}>
        <h1>Favourites</h1>
        <p>{favoriteProductToRender.length} items</p>
      </div>

      <ProductList products={favoriteProductToRender} hasDiscount={false} />
    </div>
  );
};
