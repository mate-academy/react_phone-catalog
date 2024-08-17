import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../components/Pagination';
import { ProductContent } from '../components/ProductContent';
import { ProductFilter } from '../components/ProductFilter';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useProducts } from '../hooks/useProducts';
import { useEffect, useState } from 'react';
import { SortBy } from '../types/SortBy';
import { ProductCategories } from '../types/ProductCategories';
import { PRODUCTS_TITLE } from '../constants/PRODUCTS_TITLE';

export const CatalogPage = () => {
  const { products } = useProducts();
  const { pathname } = useLocation();
  const slashlessPathname = pathname.slice(1);

  // Use useSearchParams to get and set URL parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialItemsPerPage = searchParams.get('perPage') || 'All';
  const initialSort = searchParams.get('sort') || '';

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'All'>(() =>
    initialItemsPerPage === 'All'
      ? products.length
      : parseInt(initialItemsPerPage, 10),
  );
  const [sortOption, setSortOption] = useState<SortBy | ''>(
    initialSort as SortBy,
  );

  const filteredProducts = products.filter(
    d => d.category === slashlessPathname,
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case SortBy.Newest:
        return b.year - a.year;
      case SortBy.Alphabetically:
        return a.name.localeCompare(b.name);
      case SortBy.Cheapest:
        return a.price - b.price;
      default:
        return 0;
    }
  });

  // Get current filtered items
  const defaultItemsPerPage =
    itemsPerPage === 'All' ? filteredProducts.length : itemsPerPage;

  const indexOfLastPost = currentPage * defaultItemsPerPage;
  const indexOfFirstPost = indexOfLastPost - defaultItemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstPost, indexOfLastPost);

  // Update URL parameters based on current page, itemsPerPage, and sortOption
  const updateSearchParams = (
    page: number,
    perPage: number | 'All',
    sort: SortBy | '',
  ) => {
    const params: { [key: string]: string } = {};

    if (page !== 1) {
      params.page = page.toString();
    }

    // if (perPage !== 'All' && perPage !== filteredProducts.length) {
    //   params.perPage = perPage.toString();
    // }
    if (perPage !== 'All') {
      params.perPage = perPage.toString();
    }

    if (sort) {
      params.sort = sort;
    }

    setSearchParams(params);
  };

  // Handle page change and update URL
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateSearchParams(pageNumber, itemsPerPage, sortOption);
  };

  // Handle option selection and update URL
  const handleSelectOption = (option: string, type: string) => {
    if (type === 'page') {
      if (option === 'All') {
        setItemsPerPage('All');
      } else {
        setItemsPerPage(+option);
      }
    }

    if (type === 'sort') {
      setSortOption(option as SortBy);
    }

    updateSearchParams(
      currentPage,
      itemsPerPage === 'All' ? 'All' : itemsPerPage,
      option as SortBy,
    );
  };

  // Reset parameters when changing tabs
  useEffect(() => {
    if (slashlessPathname) {
      setCurrentPage(1);
      setItemsPerPage(
        initialItemsPerPage === 'All'
          ? products.length
          : parseInt(initialItemsPerPage, 10),
      );
      setSortOption(initialSort as SortBy);
    }
  }, [slashlessPathname]);

  // Sync URL parameters with component state
  useEffect(() => {
    updateSearchParams(
      currentPage,
      itemsPerPage === filteredProducts.length ? 'All' : itemsPerPage,
      sortOption,
    );
  }, [currentPage, itemsPerPage, sortOption, filteredProducts.length]);

  return (
    <div className="catalog-page">
      <h1 className="visually-hidden">
        {PRODUCTS_TITLE[slashlessPathname as ProductCategories]} page
      </h1>

      <Breadcrumbs />

      <div className="catalog-page__title-block">
        <h2>{PRODUCTS_TITLE[slashlessPathname as ProductCategories]}</h2>
        <p className={classNames('small-text', 'catalog-page__description')}>
          {filteredProducts.length} models
        </p>
      </div>

      <ProductFilter
        handleSelectOption={handleSelectOption}
        initialSortValue={sortOption}
        initialItemsPerPageValue={
          itemsPerPage === filteredProducts.length ? 'All' : itemsPerPage
        }
      />

      <ProductContent items={currentItems} />

      {itemsPerPage !== filteredProducts.length && itemsPerPage !== 'All' && (
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
