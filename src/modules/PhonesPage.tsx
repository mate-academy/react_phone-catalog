import { BreadCrumbs } from '../components/BreadCrumbs';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../contexts/Products';

export const PhonesPage = () => {
  const { phones } = useProducts();

  return (
    <>
      <BreadCrumbs />
      <Catalog pageName={'Mobile phones'} products={phones.items} loading={phones.loading} />
    </>
  );
};
