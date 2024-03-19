import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import './PhonesPage.scss';

import home from '../../images/icons/Home.svg';
import arrow from '../../images/icons/disable_arrow.png';
import dropDownArrow from '../../images/icons/dropDownArrow.png';

import { ProductList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination/Pagination';
import { getSearchWith } from '../../utils/helper';
import { sortProducts } from '../../helpers/SortingPhones';
import { Loader } from '../../components/Loader/Loader';
import { NoResults } from '../../components/NoResults/NoResults';

type Sort = {
  Newest: string,
  Alphabetically: string,
  Cheapest: string,
};

const SortBy: Sort = {
  Newest: 'age',
  Alphabetically: 'name',
  Cheapest: 'price',
};

const items = ['4', '8', '16', 'All'];

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentOrder, setCurrentOrder] = useState<string>('Newest');
  const [isOpen, setIsOpen] = useState('');
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = parseInt(searchParams.get('page') || '1', 10);

  let sortedProducts: Product[] = [];

  if (products) {
    sortedProducts = sortProducts(products, sort, perPage, page);
  }

  useEffect(() => {
    getProducts()
      .then(productsList => {
        setProducts(productsList);
      }).finally(() => setIsLoading(false));
    const value = Object.keys(SortBy)
      .find(key => SortBy[key as keyof Sort] === sort);

    setCurrentOrder(value || 'Newest');
  }, [sort, perPage]);

  const handleOpenStatus = (value: string) => {
    if (!isOpen) {
      setIsOpen(value);
    } else {
      setIsOpen('');
    }
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      if (isOpen) {
        setIsOpen('');
      }
    }, 300);
  };

  return (
    <div className="phonePage">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!products ? (
            <NoResults page="phones" />
          ) : (
            <>

              <div className="phonePage__header">
                <Link to="/">
                  <img
                    src={home}
                    alt="home"
                    className="phonePage__icons"
                  />
                </Link>
                <img
                  src={arrow}
                  alt="arrow"
                  className="phonePage__icons"
                />
                <Link
                  to="/phones"
                  className="phonePage__currentPage"
                >
                  Phones
                </Link>
              </div>
              <h1 className="phonePage__title">Mobile phones</h1>
              <p className="phonePage__modelCount">{`${products?.length} models`}</p>
              <div className="phonePage__sorting">
                <div className="phonePage__component">
                  <p className="phonePage__component-title">Sort by</p>
                  <button
                    type="button"
                    className="phonePage__dropDown"
                    onClick={() => handleOpenStatus('Order')}
                    onBlur={handleOnBlur}
                  >
                    <p className="phonePage__dropDown-title">{currentOrder}</p>
                    <img
                      src={dropDownArrow}
                      alt="dropDownArrow"
                      className={cn('', {
                        'phonePage__dropDown-openArrow': isOpen === 'Order',
                      })}
                    />
                  </button>
                  <div className={cn('phonePage__options',
                    { 'phonePage__options-open': isOpen === 'Order' })}
                  >
                    {Object.keys(SortBy).map((key) => (
                      <Link
                        to={
                          {
                            search: getSearchWith(searchParams,
                              {
                                sort: SortBy[key as keyof Sort].toString(),
                              }),
                          }
                        }
                        type="button"
                        className="phonePage__sortButton"
                        onClick={() => setIsOpen('')}
                      >
                        {key}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="phonePage__component">
                  <p className="phonePage__component-title">Items on page</p>
                  <button
                    type="button"
                    className="phonePage__dropDown"
                    onClick={() => handleOpenStatus('PerPage')}
                    onBlur={handleOnBlur}
                  >
                    <p className="phonePage__dropDown-title">{perPage}</p>
                    <img
                      src={dropDownArrow}
                      alt="dropDownArrow"
                      className={cn('', {
                        'phonePage__dropDown-openArrow': isOpen === 'PerPage',
                      })}
                    />
                  </button>
                  <div className={cn('phonePage__options',
                    { 'phonePage__options-open': isOpen === 'PerPage' })}
                  >
                    {items.map(item => (
                      <Link
                        to={
                          {
                            search: getSearchWith(searchParams,
                              {
                                perPage: item,
                              }),
                          }
                        }
                        type="button"
                        className="phonePage__sortButton"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {sortedProducts.length > 0 && (
                <ProductList products={sortedProducts} />
              )}
              {products.length > 0 && perPage !== 'All' && (
                <Pagination
                  totalNumbersOfItems={products?.length}
                  itemsPerPage={+perPage}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
