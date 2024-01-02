import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../component/Pagination';
import { Footer } from '../component/Footer';
import { PhonesInfo } from '../component/PhonesInfo';
import { ProductsList } from '../component/ProductsList';
import { ProductFilters } from '../component/ProductFilters';

export const PhonePage = () => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '16';

  return (
    <div className="PhonePage">
      <PhonesInfo />
      <ProductFilters />
      <ProductsList />
      {perPage !== 'all' && (
        <Pagination />
      )}
      <Footer />
    </div>
  );
};
