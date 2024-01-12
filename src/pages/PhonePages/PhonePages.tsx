/* eslint-disable no-nested-ternary */
/* eslint-disable padding-line-between-statements */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { DropDown } from '../../components/DropDown/DropDown';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/Products';
import './PhonePages.scss';
import { useSearchContext } from '../../components/Context/Context';
import { Pagination } from '../../components/Pagination/Pagination';
import { getPhones } from '../../api/fetchData';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

const optionsSort = ['newest', 'alphabetically', 'price'];
const optionsItemsPage = ['all', '4', '8', '16'];

export const PhonePages: React.FC = () => {
  const [phoneProduct, setPhoneProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPhones()
      .then(setPhoneProduct)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { searchText } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedPerPage, setSelectedPerPage] = useState(optionsItemsPage[0]);
  const [preperedProducts, setPreperedProducts] = useState(phoneProduct);
  const sortParam = searchParams.get('sort') || '';
  const perPageParam = searchParams.get('perPage') || '';
  const [totalPages, setTotalPages] = useState(1);
  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageParam ? Number(pageParam) : 1);
  const [slicedProducts, setSliceProducts] = useState(phoneProduct);

  const handleOptionChange = (optionName: string, value: string) => {
    if (optionName === 'sort') {
      setSelectedSort(value);
    } else if (optionName === 'perPage') {
      setSelectedPerPage(value);
    }

    setSearchParams((prevSearchParams) => {
      prevSearchParams.set(optionName, value);
      return new URLSearchParams(prevSearchParams.toString());
    });
  };

  const handleSortChange = (selectedOption: string) => {
    handleOptionChange('sort', selectedOption);
  };

  const handlePerPageChange = (selectedOption: string) => {
    handleOptionChange('perPage', selectedOption);
    setCurrentPage(1);

    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete('page');
      return new URLSearchParams(prevSearchParams.toString());
    });
  };

  useEffect(() => {
    if (sortParam) {
      setSelectedSort(sortParam);
    }

    if (perPageParam) {
      setSelectedPerPage(perPageParam);
    }

    setSearchParams((prevSearchParams) => {
      prevSearchParams.set('query', searchText || '');

      if (!pageParam) {
        prevSearchParams.set('page', '1');
      }

      return new URLSearchParams(prevSearchParams.toString());
    });

  }, [pageParam, perPageParam, searchParams, searchText, setSearchParams, sortParam]);

  // -----------------------------------------

  useEffect(() => {
    const sorted = [...phoneProduct];

    switch (selectedSort) {
      case 'newest':
        sorted.sort((a, b) => b.year - a.year);
        break;
      case 'alphabetically':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
    }

    const filteredAndSortedProducts = sorted.filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    });

    setPreperedProducts(filteredAndSortedProducts);
  }, [phoneProduct, selectedSort, selectedPerPage, searchText]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams.toString());
      newSearchParams.set('page', page.toString());
      return newSearchParams;
    });
  };

  useEffect(() => {

    if (selectedPerPage !== 'all') {
      const calculateTotalPages = Math.ceil(preperedProducts.length / Number(selectedPerPage));

      const startIndex = (currentPage - 1) * Number(selectedPerPage);
      const endIndex = startIndex + Number(selectedPerPage);
      const sliceProducts = preperedProducts.slice(startIndex, endIndex);

      setSliceProducts(sliceProducts);
      setTotalPages(calculateTotalPages);

    } else {
      const defaultProducts = preperedProducts.slice(0, preperedProducts.length);
      setSliceProducts(defaultProducts);
      setTotalPages(1);
    }

  }, [preperedProducts, totalPages, currentPage, searchText, selectedPerPage]);

  useEffect(() => {

    if (!pageParam) {

      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams.toString());
        newSearchParams.set('page', '1');
        return newSearchParams;
      });
    }
  }, [pageParam, searchParams, setSearchParams]);

  return (
    <section
      className="mobile__container"
      data-cy="categoryLinksContainer"
    >
      <div className="container">

        <BreadCrumbs />
        <div className="mobile">
          <div className="mobile__title">
            Mobile phones
          </div>
          <p className="mobile__count">{`${phoneProduct.length} models`}</p>

          <div className="mobile__dropdown">
            <DropDown
              options={optionsSort}
              startValue={sortParam || 'Choose an option'}
              label="Sort by"
              selectChange={handleSortChange}
            />
            <DropDown
              options={optionsItemsPage}
              startValue={perPageParam || 'All'}
              label="Items on page"
              selectChange={handlePerPageChange}
            />
          </div>

          {isError && (
            <ErrorMessage />
          )}

          {isLoading && !isError ? (
            <Loader />
          ) : (
            <div
              className="mobile__list"
              data-cy="productList"
            >
              {slicedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>

        {totalPages !== 1 && !!preperedProducts.length && (
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}

        {/* ------------------- */}
      </div>
    </section>
  );
};
