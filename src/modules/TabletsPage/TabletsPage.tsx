import { Loader } from '../shared/components/Loader';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from '../shared/components/ProductsList';

export const TabletsPage = () => {
  return (
    <>
      <h1>Tablets page</h1>
      <Loader />
      <ProductsList title="ProductsList (tablets)" />
      <Pagination />
    </>
  );
};
