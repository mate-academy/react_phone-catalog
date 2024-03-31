import { twMerge } from 'tailwind-merge';
import { Product, ProductCategory } from '../types/products';
import { DropDownButton } from './DropDownButton';
import { useEffect, useState } from 'react';
import { getAmountOfProducts, getFilteredProducts } from '../api/products';
import { ProductCard } from './ProductCard';
import { useSearchParams } from 'react-router-dom';
import { SearchWithParams } from '../types/main';
import { getSearchWith } from '../helpers/functions';
import { Pagination } from './Pagination';
import { Loader } from './Loader';

interface Props {
  type: ProductCategory;
  className?: string;
}

export const ProductsList: React.FC<Props> = ({ type, className = '' }) => {
  const [cards, setCards] = useState<Product[]>([]);
  const [productsAmount, setProductsAmount] = useState({
    accessories: 0,
    phones: 0,
    tablets: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const sortBy = searchParams.get('sortBy') || 'Newest';
  const itemsOnPage = searchParams.get('itemsOnPage') || '4';
  const page = searchParams.get('page') || '1';

  const lastPage = !isNaN(+itemsOnPage)
    ? Math.ceil(productsAmount[type] / +itemsOnPage)
    : productsAmount[type];

  const setSearchWith = (params: SearchWithParams) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  useEffect(() => {
    const parsedItemsOnPage =
      itemsOnPage === 'All' ? 'All' : parseInt(itemsOnPage);
    const parsedPage = parseInt(page);

    setIsLoading(true);
    getFilteredProducts(type, sortBy, parsedItemsOnPage, parsedPage)
      .then(setCards)
      .finally(() => setIsLoading(false));
  }, [itemsOnPage, page, sortBy, type]);

  useEffect(() => {
    getAmountOfProducts().then(setProductsAmount);
  }, [type]);

  const handleItemsOnPage = (option: string) => {
    setSearchWith({ itemsOnPage: option, page: '1' });
  };

  return (
    <div className={twMerge('flex flex-col gap-6', className)}>
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
      ) : (
        <>
          {cards.length ? (
            <div
              className="grid
              w-full grid-cols-[repeat(auto-fill,minmax(theme(width.68),1fr))]
              gap-10 gap-x-4"
            >
              {cards.map(card => (
                <ProductCard className="w-full" key={card.id} product={card} />
              ))}
            </div>
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
        </>
      )}
    </div>
  );
};
