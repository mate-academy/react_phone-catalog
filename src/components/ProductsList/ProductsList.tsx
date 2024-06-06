import { FC, useMemo } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useSearchParams } from 'react-router-dom';
import { ProductItem } from '../ProductItem';
import { sortPhones, setSearchWith } from '../../helper';
import { Pagination } from '../Pagination';
import { DropDown } from '../DropDown/DropDown';
import { TSort, TPage, IPhone } from '../../types';

import './ProductsList.scss';

type Props = {
  products: IPhone[];
};

export const ProductsList: FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = +(searchParams.get('perPage') || 16);
  const page = +(searchParams.get('page') || '1');

  const sortedProducts = useMemo(() => {
    return sortPhones(products, sort);
  }, [products, sort]);

  const firstItem = (page - 1) * perPage;

  const lastItem = Math.min(
    (page) * perPage,
    sortedProducts.length,
  );

  const currentItems = sortedProducts.slice(firstItem, lastItem);

  const onPageChange = ((value: number) => {
    setSearchWith(
      searchParams,
      { page: value || null },
      setSearchParams,
    );
  });

  const handleItemsPerPage = (value: string) => {
    const setValue = value === 'All' ? sortedProducts.length : value;

    setSearchWith(
      searchParams,
      { perPage: setValue || null, page: 1 },
      setSearchParams,
    );
  };

  const handleSortChange = (
    value: string,
  ) => {
    const sortValue = value === 'all' ? null : value;

    setSearchWith(
      searchParams,
      { sort: sortValue || null },
      setSearchParams,
    );
  };

  const listOfSort: TSort = {
    All: 'all',
    Newest: 'year',
    Cheapest: 'price',
    Alphabetically: 'name',
  };

  const selectedSortName = useMemo(() => {
    const currValue = sort;

    return Object.keys(listOfSort).find(
      (item) => listOfSort[item as keyof TSort] === currValue,
    ) || 'All';
  }, [searchParams]);

  const listOfPage: TPage = {
    4: '4',
    8: '8',
    16: '16',
    All: 'All',
  };

  return (
    <>
      <div className="productList__dropdown">
        <DropDown
          label="Sort by"
          listOfProperties={listOfSort}
          handleClick={handleSortChange}
          nameProperties={selectedSortName}
        />

        <DropDown
          label="Items on page"
          listOfProperties={listOfPage}
          handleClick={handleItemsPerPage}
          nameProperties={perPage === sortPhones.length ? 'All' : perPage}
        />
      </div>

      {products.length ? (
        <>
          <ul className="productList__grid" data-cy="productList">
            {currentItems.map((item) => (
              <li className="productList__gridItem" key={item.itemId}>
                <ProductItem product={item} />
              </li>
            ))}
          </ul>

          {perPage === 71 ? (
            ''
          ) : (
            <div className="productList__pagiantion">
              <Pagination
                totalItems={products.length}
                currentPage={page}
                onPageChange={onPageChange}
                itemPerPage={perPage}
              />
            </div>
          )}
        </>
      ) : (
        <TypeAnimation
          sequence={['Not found ...', 1000]}
          style={{
            fontSize: '3em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            padding: '32px 0',
            color: '#313237',
          }}
        />
      )}
    </>
  );
};
