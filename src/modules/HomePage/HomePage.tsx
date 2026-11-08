import { ErrorMessage } from '../shared/components/ErrorMessage';
import { Loader } from '../shared/components/Loader';
import { useProducts } from '../shared/hooks/useProducts';
import { Categories } from './components/Categories';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, isLoading, hasError, reload } = useProducts();

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return <ErrorMessage onReload={reload} />;
    }

    return (
      <div className={styles.blocks}>
        {/* Brand new models slider will go here */}

        <Categories products={products} />

        {/* Hot prices slider will go here */}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.hiddenTitle}>Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      {/* Pictures slider will go here */}

      {renderContent()}
    </div>
  );
};
