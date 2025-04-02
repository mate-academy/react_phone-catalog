import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCart } from '../../components/ProductCart';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const FavoritesPage = () => {
  const { state } = useFavorites();

  return (
    <div className={styles.container}>
      <BreadCrumbs></BreadCrumbs>

      <h1>Favorites</h1>

      <span>{state.items.length} items</span>

      <div className={styles.stateDiv}>
        {state.items.map(item => (
          <ProductCart key={item.product.id} item={item.product} />
        ))}
      </div>
    </div>
  );
};
