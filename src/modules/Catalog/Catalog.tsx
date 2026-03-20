import { useContext } from 'react';
import { Category } from '../../components/layout/Category';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductColection } from '../../components/layout/ProductColection';
import { ProductsContext } from '../../store/ProductsProvider';
import styles from './Catalog.module.scss';

export const Catalog = () => {
  const products = useContext(ProductsContext);

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
        />
        <ProductColection
          title="Tablets"
          products={getCategoryProducts('tablets')}
        />
        <ProductColection
          title="Accessories"
          products={getCategoryProducts('accessories')}
        />
      </div>
    </div>
  );
};
