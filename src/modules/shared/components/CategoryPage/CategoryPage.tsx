import React, { useEffect, useState } from 'react';
import styles from './CategoryPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getProducts } from '../../../../utils/fetchClient';
import { Product } from '../../../../types/product';
import CustomSelect from '../CustomSelect';
import Pagination from '../Pagination';
import ProductsList from '../ProductsList';
import Breadcrumbs from '../Breadcrumbs';

type Props = {
  type: string;
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const CategoryPage: React.FC<Props> = ({ type }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [fetchResult, setFetchResult] = useState<Product[]>([]);
  const [visibleItems, setVisibleItems] = useState(items);
  const [isLoading, setIsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || 1;
  const startIndex = perPage === 'All' ? 0 : (+currentPage - 1) * +perPage;
  const endIndex = perPage === 'All' ? -1 : startIndex + +perPage;
  const [selectOption, setSelectOption] = useState<string>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
        const filtered = response.filter(product => product.category === type);

        setFetchResult(filtered);
      } catch (error) {
        throw error;
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchProducts();
  }, [type]);

  useEffect(() => {
    setProductsLoading(true);
    setVisibleItems(items.slice(startIndex, endIndex));

    setTimeout(() => {
      setProductsLoading(false);
    }, 2000);
  }, [endIndex, startIndex, items]);

  useEffect(() => {
    setProductsLoading(true);
    switch (sort) {
      case 'age':
        setSelectOption('Newest');
        break;
      case 'price':
        setSelectOption('Cheapest');
        break;
      case 'title':
        setSelectOption('Alphabetically');
        break;
    }

    const newSortedItems = [...fetchResult].sort((p1, p2) => {
      switch (sort) {
        case 'age':
          return p2.year - p1.year;
        case 'price':
          return p1.price - p2.price;
        case 'title':
          return p1.name.localeCompare(p2.name);
        default:
          return 0;
      }
    });

    setItems(newSortedItems);

    setTimeout(() => {
      setProductsLoading(false);
    }, 2000);
  }, [sort, fetchResult]);

  function selectPage(page: number) {
    const newParams = new URLSearchParams(searchParams);

    if (page === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', page.toString());
    }

    setSearchParams(newParams);
  }

  function changePerPage(e: string) {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('page');

    if (e === 'All') {
      newParams.delete('perPage');
    } else {
      newParams.set('perPage', e);
    }

    setSearchParams(newParams);
  }

  function changeSorting(e: string) {
    const newParams = new URLSearchParams(searchParams);

    if (e === 'age') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', e);
    }

    setSearchParams(newParams);
  }

  return (
    <>
      {!isLoading ? (
        <span className="container">
          <Breadcrumbs />
          <h1 style={{ marginBottom: '8px' }}>{capitalize(type)}</h1>
          <p className={styles.modelsNumber}>{items.length} models</p>
          {items.length > 0 ? (
            <>
              <form className={styles.form}>
                <div className={styles.form__control}>
                  <CustomSelect
                    onSelect={changeSorting}
                    selected={selectOption || 'Newest'}
                    options={[
                      { label: 'Newest', value: 'age' },
                      { label: 'Alphabetically', value: 'title' },
                      { label: 'Cheapest', value: 'price' },
                    ]}
                  />
                </div>
                <div className={styles.form__control}>
                  <CustomSelect
                    onSelect={changePerPage}
                    selected={perPage || 'All'}
                    options={[
                      { label: '4', value: '4' },
                      { label: '8', value: '8' },
                      { label: '16', value: '16' },
                      { label: 'All', value: 'All' },
                    ]}
                  />
                </div>
              </form>

              {!productsLoading ? (
                <>
                  <ProductsList products={visibleItems} />

                  {perPage !== 'All' && (
                    <Pagination
                      totalItems={items.length}
                      currentPage={+currentPage || 1}
                      setPage={selectPage}
                      perPage={+perPage}
                    />
                  )}
                </>
              ) : (
                <Loader />
              )}
            </>
          ) : (
            <h2>There are no {type} yet...</h2>
          )}
        </span>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CategoryPage;
