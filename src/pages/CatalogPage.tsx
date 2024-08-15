// import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { Pagination } from '../components/Pagination';
import { ProductContent } from '../components/ProductContent';
import { ProductFilter } from '../components/ProductFilter';
// import { Product } from '../types/Product';
// import { getProducts } from '../services/products';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useProducts } from '../hooks/useProducts';
import { useState } from 'react';
import { SortBy } from '../types/SortBy';

type CategoryKey = 'phones' | 'tablets' | 'accessories';

const TITLE: Record<CategoryKey, string> = {
  phones: 'Mobile Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const CatalogPage = () => {
  const { products } = useProducts();
  const { pathname } = useLocation();
  const paramFromNavLink = pathname.slice(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [sortOption, setSortOption] = useState<SortBy | ''>('');

  const filteredProducts = products.filter(
    d => d.category === paramFromNavLink,
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

  //get current fitlered items
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectOption = (option: string, type: string) => {
    if (type === 'page') {
      if (option === 'All') {
        setItemsPerPage(filteredProducts.length);
      } else {
        setItemsPerPage(+option);
      }
    }

    if (type === 'sort') {
      setSortOption(option as SortBy);
    }
  };

  return (
    <div className="catalog-page">
      <Breadcrumbs />

      <div className="catalog-page__title-block">
        <h2>{TITLE[paramFromNavLink as CategoryKey]}</h2>
        <p className={classNames('small-text', 'catalog-page__description')}>
          {filteredProducts.length} models
        </p>
      </div>

      <ProductFilter handleSelectOption={handleSelectOption} />

      <ProductContent items={currentItems} />

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
