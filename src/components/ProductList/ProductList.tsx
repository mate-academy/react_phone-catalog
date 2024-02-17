import './ProductList.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { PerPageSelect, SelectOption, SortBy } from '../../types/select';
import { ProductCard } from '../ProductCard';
import { MySelect } from '../UI/MySelect';
import { Pagination } from '../Pagination';

const SORT_BY: SelectOption[] = [
  { age: SortBy.Newest },
  { name: SortBy.Alphabetically },
  { price: SortBy.Cheapest },
];

const PER_PAGE: PerPageSelect[] = [
  { All: 'all' },
  { 16: '16' },
  { 8: '8' },
  { 4: '4' },
];

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || products.length;
  const paginationCount = perPage === 'all'
    ? 0
    : Math.ceil(products.length / +perPage);

  const paginationButtons = [];

  for (let i = 1; i <= paginationCount; i += 1) {
    paginationButtons.push(i);
  }

  return (
    <section className="product-list" data-cy="productList">
      <div className="product-list__controls">
        <MySelect
          defaultValue="Newest"
          title="Sort by"
          options={SORT_BY}
          searchName="sort"
          width={176}
        />

        <MySelect
          defaultValue="All"
          title="Items on page"
          options={PER_PAGE}
          searchName="perPage"
          width={128}
        />
      </div>

      <div className="product-list__items">
        {products.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      <Pagination paginationButtons={paginationButtons} />
    </section>
  );
};
