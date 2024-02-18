import './ProductList.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/product';
import {
  PerPageSelect,
  SelectOption,
  SortBy,
  SortParams,
} from '../../types/select';
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

const sortParams = {
  name: SortBy.Alphabetically,
  age: SortBy.Newest,
  price: SortBy.Cheapest,
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || 'all';
  const sort = (searchParams.get('sort') || 'age') as SortParams;

  const page = +(searchParams.get('page') || 1);
  const paginationButtons = [];

  const paginationCount = perPage === 'all'
    ? 0
    : Math.ceil(products.length / +perPage);

  for (let i = 1; i <= paginationCount; i += 1) {
    paginationButtons.push(i);
  }

  function getPreparedProducts() {
    if (perPage === 'all') {
      return products;
    }

    const itemsOnPage = +perPage;

    return [...products]
      .splice(((page * itemsOnPage) - itemsOnPage), itemsOnPage);
  }

  const preparedProducts = getPreparedProducts();

  return (
    <section className="product-list" data-cy="productList">
      <div className="product-list__controls">
        <div className="product-list__controls--left">
          <MySelect
            defaultValue={sortParams[sort]}
            title="Sort by"
            options={SORT_BY}
            searchName="sort"
          />
        </div>

        <div className="product-list__controls--right">
          <MySelect
            defaultValue={perPage === 'all' ? 'All' : perPage.toString()}
            title="Items on page"
            options={PER_PAGE}
            searchName="perPage"
          />
        </div>
      </div>

      <div className="product-list__items">
        {preparedProducts.map(item => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {paginationButtons.length > 1 && (
        <Pagination paginationButtons={paginationButtons} />
      )}
    </section>
  );
};
