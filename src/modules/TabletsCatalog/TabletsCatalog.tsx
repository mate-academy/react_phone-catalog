import { CatalogPage } from '../shared/components/CatalogPage';
import { useProducts } from '../../hooks/context/useProducts';
import { Loader } from '../shared/components/Loader';

export const TabletsCatalog = () => {
  const { products, loading, error, reload } = useProducts();

  const readyProducts = products.filter(
    product => product.category === 'tablets',
  );

  if (!loading && error) {
    return <Loader status="error" onReload={reload} />;
  }

  if (!loading && !error && readyProducts.length === 0) {
    return <Loader status="empty" emptyMessage="There are no phones yet :(" />;
  }

  return (
    <>
      {!error && (
        <CatalogPage
          items={readyProducts}
          title="catalog_pages.title.tablets"
          loading={loading}
        />
      )}
    </>
  );
};
