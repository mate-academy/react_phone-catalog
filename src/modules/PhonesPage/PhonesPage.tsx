import { ProductCard } from '../../components/ProductCard/ProductCard';
import products from '../../api/products.json';
import s from './PhonesPage.module.scss';
import { ProductFilters } from '../../components/ProductFilters/ProductFilters';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';

const phones = products.filter((product) => product.category === 'phones');
const phonesCount = phones.length;

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();

  const perPageParam = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || '';

  const perPage = perPageParam === 'All' ? phonesCount : Number(perPageParam);

  const sortedPhones = [...phones].sort((phone1, phone2) => {
    switch (sortBy) {
      case 'Newest':
        return phone2.year - phone1.year;
      case 'Alphabetically':
        return phone1.name.localeCompare(phone2.name);

      case 'Cheapest':
        return phone1.fullPrice - phone2.fullPrice;
      default:
        return 0;
    }
  });

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const visiblePhones = sortedPhones.slice(startIndex, endIndex);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Mobile phones</h1>
      <div className={s.counter}>{phonesCount} models</div>

      <ProductFilters />

      <div className={s.content}>
        {visiblePhones.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination total={phonesCount} currentPage={currentPage} perPage={perPage} />
    </div>
  );
};
