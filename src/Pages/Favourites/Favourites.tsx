// Favourites.tsx
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import styles from './Favourites.module.scss';
import { useFavourites } from '../../context/FavouritesContext';
import { Product } from '../../types/Product';

interface FavouritesProps {
  category: string;
  products: Product[];
}

export const Favourites = ({ category, products }: FavouritesProps) => {
  // 1. Отримуємо масив збережених назв/itemId з контексту
  const { favourites } = useFavourites();

  const favouriteProducts = products.filter(product =>
    favourites.includes(product.itemId),
  );

  return (
    <section className={styles.favourites}>
      <div className="favourites__container">
        <Breadcrumbs category={category} />
        <h1 className={`section-title-h1 ${styles.title}`}>Favourites</h1>
        <p className={`mb-32-40 ${styles.quantityGoods}`}>
          <span>{favouriteProducts.length}</span> models
        </p>
        <ProductsList products={favouriteProducts} />
      </div>
    </section>
  );
};
