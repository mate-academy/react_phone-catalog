/* eslint-disable no-nested-ternary */
/* eslint-disable padding-line-between-statements */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { DropDown } from '../../components/DropDown/DropDown';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types/Products';
import './PhonePages.scss';
import { useSearchContext } from '../../components/Context/Context';
import { Pagination } from '../../components/Pagination/Pagination';

const optionsSort = ['newest', 'alphabetically', 'price'];
const optionsItemsPage = ['all', '4', '8', '16'];

type Props = {
  products: Product[];
};

export const PhonePages: React.FC<Props> = ({ products }) => {
  const { searchText } = useSearchContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedPerPage, setSelectedPerPage] = useState(optionsItemsPage[0]);
  const [preperedProducts, setPreperedProducts] = useState(products);
  const sortParam = searchParams.get('sort') || '';
  const perPageParam = searchParams.get('perPage') || '';
  const [totalPages, setTotalPages] = useState(1);

  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageParam ? Number(pageParam) : 1);
  const [slicedProducts, setSliceProducts] = useState(products);

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

    // Скидую значення "page" на 1 після зміни параметра "perPage" у URL
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

  }, [searchParams, searchText]);

  // -----------------------------------------

  useEffect(() => {
    const sorted = [...products];

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
  }, [products, selectedSort, selectedPerPage, searchText]);

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

  }, [preperedProducts, totalPages, currentPage, searchText]);

  useEffect(() => {

    if (!pageParam) {

      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams.toString());
        newSearchParams.set('page', '1');
        return newSearchParams;
      });
    }
  }, [searchParams]);

  return (
    <section className="mobile__container">
      <div className="container">

        <BreadCrumbs />
        <div className="mobile">
          <div className="mobile__title">
            Mobile phones
          </div>
          <p className="mobile__count">{`${products.length} models`}</p>

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

          <div className="mobile__list">
            {slicedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
      {totalPages !== 1 && !!preperedProducts.length && (
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}

    </section>
  );
};
