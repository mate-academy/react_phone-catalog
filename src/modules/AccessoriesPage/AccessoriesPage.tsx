import { Loader } from '../shared/components/Loader';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from '../shared/components/ProductsList';

export const AccessoriesPage = () => {
  return (
    <>
      <h1>Accessories page</h1>
      <Loader />
      <ProductsList title="ProductsList (accessories)" />
      <Pagination />
    </>
  );
};
