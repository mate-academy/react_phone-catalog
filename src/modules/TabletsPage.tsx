import { BreadCrumbs } from '../components/BreadCrumbs';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../contexts/Products';

export const TabletsPage = () => {
  const { tablets } = useProducts();

  return (
    <>
      <BreadCrumbs />
      <Catalog pageName={'Tablets'} products={tablets.items} loading={tablets.loading} />
    </>
  );
};
