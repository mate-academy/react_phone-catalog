import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DropdownButton } from '../components/DropdownButton';
import { SearchParams, getSearchWith } from '../helpers/searchHelper';
import { Pagination } from '../components/Pagination';
import { getAmountOfProducts, getPreparedProducts } from '../api/products';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { TypeItemOnPage, TypeProduct, TypeSort } from '../types/product';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';

const test = [
  {
    id: 1,
    title: 'Newest',
  },
  {
    id: 2,
    title: 'Alphabetically',
  },
  {
    id: 3,
    title: 'Cheapest',
  },
];

const test2 = [
  {
    id: 1,
    title: 'All',
  },
  {
    id: 2,
    title: '4',
  },
  {
    id: 3,
    title: '8',
  },
  {
    id: 4,
    title: '16',
  },
];

interface Props {
  type: TypeProduct;
}

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sortBy') || 'Newest') as TypeSort;
  const itemsOnPage = (searchParams.get('itemsOnPage') ||
    'All') as TypeItemOnPage;
  const page = searchParams.get('page') || '1';

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const { isLoading: isPreparedProducts, data: preparedProducts } = useQuery({
    queryKey: ['preparedProducts', type, sortBy, page, itemsOnPage],
    queryFn: () => getPreparedProducts(type, sortBy, +page, itemsOnPage),
    placeholderData: keepPreviousData,
  });

  const { data: amountOfProducts } = useQuery({
    queryKey: ['amountOfProducts'],
    queryFn: getAmountOfProducts,
  });

  const lastPage =
    amountOfProducts && Math.ceil(amountOfProducts[type] / +itemsOnPage);

  return (
    <main className="content flex w-full flex-col gap-8 pt-6 md:gap-10">
      <Breadcrumbs />

      <div>
        <h1>Mobile phones</h1>

        {amountOfProducts && (
          <p className="font-semibold text-secondary">
            {amountOfProducts[type]} models
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 pb-20">
        <div className="flex gap-2">
          <div className="flex w-full flex-col gap-1 md:max-w-44">
            <small className="font-bold text-secondary">Sort by</small>
            <DropdownButton
              options={test}
              initialOption={sortBy}
              onClickOptipn={option => setSearchWith({ sortBy: option.title })}
            />
          </div>

          <div className="flex w-full flex-col gap-1 md:max-w-44">
            <small className="font-bold text-secondary">Items on page</small>
            <DropdownButton
              options={test2}
              initialOption={itemsOnPage}
              onClickOptipn={option =>
                setSearchWith({ itemsOnPage: option.title })
              }
            />
          </div>
        </div>

        {isPreparedProducts ? (
          <Loader />
        ) : (
          <div
            className="
                grid w-full
                grid-cols-[repeat(auto-fill,minmax(theme(width.68),1fr))]
                gap-10 gap-x-4
              "
          >
            {preparedProducts?.map(product => (
              <ProductCard
                product={product}
                key={product.id}
                className="w-full"
              />
            ))}
          </div>
        )}

        {itemsOnPage !== 'All' && lastPage && (
          <div>
            <Pagination
              maxLength={7}
              currentPage={+page}
              lastPage={lastPage || 0}
              setCurrentPage={currentPage =>
                setSearchWith({ page: `${currentPage}` })
              }
            />
          </div>
        )}
      </div>
    </main>
  );
};
