import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getAmountOfProducts, getFilteredProducts } from '../api/products';
import { ProductsList } from '../components/ProductsList';
import { Product, ProductCategory } from '../types/products';
import { useSearchParams } from 'react-router-dom';
import { DropDownButton } from '../components/DropDownButton';
import { SearchWithParams } from '../types/main';
import { getSearchWith } from '../helpers/functions';
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';

interface Props {
  type: ProductCategory;
}

const getTitle = (type: ProductCategory) => {
  switch (type) {
    case 'phones':
      return 'Mobile phones';
    case 'accessories':
      return 'Accessories';
    case 'tablets':
      return 'Tablets';

    default:
      return '';
  }
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  const [cards, setCards] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsAmount, setProductsAmount] = useState({
    accessories: 0,
    phones: 0,
    tablets: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'Newest';
  const itemsOnPage = searchParams.get('itemsOnPage') || '4';
  const page = searchParams.get('page') || 1;

  const lastPage = !isNaN(+itemsOnPage)
    ? Math.ceil(productsAmount[type] / +itemsOnPage)
    : productsAmount[type];

  const setSearchWith = (params: SearchWithParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleItemsOnPage = (option: string) => {
    setSearchWith({ itemsOnPage: option, page: '1' });
  };

  useEffect(() => {
    getAmountOfProducts().then(setProductsAmount);
  }, []);

  useEffect(() => {
    const parsedItemsOnPage =
      itemsOnPage === 'All' ? 'All' : parseInt(itemsOnPage);
    const parsedPage = page;

    setIsLoading(true);
    getFilteredProducts(type, sortBy, parsedItemsOnPage, +parsedPage)
      .then(setCards)
      .finally(() => setIsLoading(false));
  }, [itemsOnPage, page, sortBy, type]);

  return (
    <main
      className="content-padding flex w-full flex-col gap-6
      pb-16 pt-6 md:gap-10"
    >
      <Breadcrumbs />

      <div className="flex flex-col gap-2">
        <h1>{getTitle(type)}</h1>
        <p className="text-secondary">{`${productsAmount[type]} models`}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex w-full gap-4">
          <div className="flex w-full max-w-34 flex-col gap-1 md:max-w-47">
            <p className="font-semibold text-secondary">Sort by</p>
            <DropDownButton
              className="md:w-full"
              placeholder={sortBy}
              onChange={option => setSearchWith({ sortBy: option })}
              options={['Newest', 'Alphabetically', 'Cheapest']}
            />
          </div>
          <div className="flex w-full max-w-34 flex-col gap-1">
            <p className="font-semibold text-secondary">Items on page</p>
            <DropDownButton
              className="md:w-full"
              placeholder={itemsOnPage}
              onChange={handleItemsOnPage}
              options={['4', '8', '16', 'All']}
            />
          </div>
        </div>
        {isLoading ? (
          <Loader className="m-auto" />
        ) : cards.length ? (
          <ProductsList cards={cards} />
        ) : (
          <h1 className="text-center">{`There are no ${type} yet`}</h1>
        )}
        {itemsOnPage !== 'All' && (
          <Pagination
            maxLength={7}
            className="flex justify-center"
            currentPage={+page}
            lastPage={lastPage}
            setCurrentPage={item => setSearchWith({ page: item })}
          />
        )}
      </div>
    </main>
  );
};
