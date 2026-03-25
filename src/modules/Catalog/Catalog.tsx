import { Category } from '../../components/layout/Category';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductColection } from '../../components/layout/ProductColection';
import { useProducts } from '../../hooks/useProducts';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const { products, isLoading } = useProducts();

  const getCategoryProducts = (category: string) => {
    if (!products.length) {
      return null;
    }

    return products.filter(item => item.category === category);
  };

  return (
    <div className={styles.container}>
      <Pagetoolbar breadcrumbs title="Catalog" />
      <div className={styles.content}>
        <Category />
        <ProductColection
          title="Phones"
          products={getCategoryProducts('phones')}
          loading={isLoading}
        />
        <ProductColection
          title="Tablets"
          products={getCategoryProducts('tablets')}
          loading={isLoading}
        />
        <ProductColection
          title="Accessories"
          products={getCategoryProducts('accessories')}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
