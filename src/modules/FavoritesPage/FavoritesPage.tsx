import { useFavorites } from '../../contexts/FavoritesContext';
import { brandNewProducts, hotPricesProducts } from '../../data/products';
import { ProductsGrid } from '../../components-cp/ProductsGrid/ProductsGrid';
import { Breadcrumbs } from '../../components-cp/Breadcrumbs/Breadcrumbs';
import { baseProducts } from '../../data/products';
import { useTranslation } from 'react-i18next';
import styles from './FavoritesPage.module.scss';
import { useCart } from '../../contexts/CartContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const allProducts = [
    ...baseProducts,
    ...brandNewProducts,
    ...hotPricesProducts,
  ];

  const favoriteProducts = allProducts.filter(product =>
    favorites.includes(product.id),
  );

  const normalizedFavorites = favoriteProducts.map(product => ({
    id: product.id.toString(),
    image: product.image,
    title: product.title ?? product.name,
    price: product.price,
    oldPrice: product.oldPrice ?? product.fullPrice,
    specs: product.specs ?? product.baseSpecs ?? [],
    originalId: product.id,
  }));

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumbs currentPage="favorites" />

      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{t('favoritesPage.title')}</h1>
        {normalizedFavorites.length > 0 && (
          <p className={styles.itemsCount}>
            {normalizedFavorites.length}{' '}
            {normalizedFavorites.length === 1
              ? t('favoritesPage.item')
              : t('favoritesPage.items')}
          </p>
        )}
      </div>

      {normalizedFavorites.length === 0 ? (
        <p className={styles.empty}>{t('favoritesPage.empty')}</p>
      ) : (
        <ProductsGrid
          products={normalizedFavorites}
          visibleCount="all"
          setVisibleCount={() => {}}
          showPagination={false}
          className={styles.favoritesGrid}
          onAddToCart={product =>
            addToCart({
              id: product.originalId,
              title: product.title,
              image: product.image,
              price: Number(product.price.replace(/\$/g, '')),
              quantity: 1,
            })
          }
        />
      )}
    </div>
  );
};
