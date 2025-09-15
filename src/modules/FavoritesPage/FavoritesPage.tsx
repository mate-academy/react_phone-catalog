import { useEffect, useState } from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Breadcrumbs } from '../../components-cp/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import styles from './FavoritesPage.module.scss';
import { useCart } from '../../contexts/CartContext';
import { ProductsGrid } from '../../components-cp/ProductsGrid/ProductsGrid';
import { Loader } from '../../components/Loader/Loader';

interface RawProduct {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price?: number;
  screen?: string;
  capacity?: string;
  color?: string;
  ram?: string;
  year?: number;
  image: string;
}

interface Spec {
  left: string;
  right: string;
}

interface ProductType {
  id: string;
  namespaceId: string;
  category: string;
  title: string;
  price: number;
  oldPrice?: number;
  images: string[];
  colors: string[];
  color: string;
  memory: string[];
  capacity: string;
  fullSpecs: Spec[];
  description: { title: string; text: string[] }[];
  shortSpecs: Spec[];
}

interface PhonesPageProps {
  theme: 'light' | 'dark';
}

export const FavoritesPage: React.FC<PhonesPageProps> = ({ theme }) => {
  const { favorites } = useFavorites();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('api/products.json');

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const products: RawProduct[] = await res.json();

        const favoriteProducts = products
          .filter(p => favorites.includes(p.itemId))
          .map(p => ({
            id: p.itemId,
            namespaceId: p.itemId,
            category: p.category,
            title: p.name,
            price: p.price ?? p.fullPrice,
            oldPrice: p.price ? p.fullPrice : undefined,
            images: [p.image],
            colors: p.color ? [p.color] : [],
            color: p.color ?? '',
            memory: [],
            capacity: p.capacity ?? '-',
            fullSpecs: [
              { left: 'Screen', right: p.screen ?? '-' },
              { left: 'Capacity', right: p.capacity ?? '-' },
              { left: 'RAM', right: p.ram ?? '-' },
              { left: 'Year', right: p.year?.toString() ?? '-' },
            ],
            description: [],
            shortSpecs: [
              { left: 'Screen', right: p.screen ?? '-' },
              { left: 'Capacity', right: p.capacity ?? '-' },
              { left: 'RAM', right: p.ram ?? '-' },
            ],
          }));

        setAllProducts(favoriteProducts);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [favorites]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <Breadcrumbs currentPage="favorites" theme={theme} />

      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{t('favoritesPage.title')}</h1>
        {allProducts.length > 0 && (
          <p className={styles.itemsCount}>
            {allProducts.length}{' '}
            {allProducts.length === 1
              ? t('favoritesPage.item')
              : t('favoritesPage.items')}
          </p>
        )}
      </div>

      {allProducts.length === 0 ? (
        <p className={styles.empty}>{t('favoritesPage.empty')}</p>
      ) : (
        <ProductsGrid
          products={allProducts.map(p => ({
            id: p.id,
            originalId: p.namespaceId,
            image: p.images[0],
            title: p.title,
            price: p.price,
            oldPrice: p.oldPrice,
            specs: {
              screen: p.shortSpecs.find(s => s.left === 'Screen')?.right,
              capacity: p.shortSpecs.find(s => s.left === 'Capacity')?.right,
              ram: p.shortSpecs.find(s => s.left === 'RAM')?.right,
            },
          }))}
          visibleCount="all"
          setVisibleCount={() => {}}
          showPagination={false}
          className={styles.favoritesGrid}
          onAddToCart={product =>
            addToCart({
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
            })
          }
        />
      )}
    </div>
  );
};
