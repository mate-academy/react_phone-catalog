import { Loader } from '../shared/components/Loader';
import { Pagination } from '../shared/components/Pagination';
import { ProductsList } from '../shared/components/ProductsList';

export const PhonesPage = () => {
  return (
    <>
      <h1>Phones page</h1>
      <Loader />
      <ProductsList title="ProductsList (phones)" />
      <Pagination />
    </>
  );
};
