import { BreadCrumbs } from '../components/BreadCrumbs';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../contexts/Products';

export const AccessoriesPage = () => {
  const { accessories } = useProducts();

  return (
    <>
      <BreadCrumbs />
      <Catalog pageName={'Accessories'} products={accessories.items} loading={accessories.loading} />
    </>
  );
};
