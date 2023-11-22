import './PhonesPage.scss';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { getPhones } from '../../helpers/apis';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';

export const PhonesPage = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '0', 10)
    || null;
  const currentPage = parseInt(searchParams.get('page') || '1', 10) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);
    getPhones('products.json')
      .then((data: any) => {
        setProductData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error loading data:', error);
        setIsLoading(false);
      });
  }, []);

  function applySortingAndFiltering(products: Product[]) {
    let filteredProducts: Product[] = [...products];

    if (query.trim() !== '') {
      filteredProducts = products.filter(
        (product) => product.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (sort) {
      case 'alphabetically':
        filteredProducts = filteredProducts.sort(
          (a, b) => a.name.localeCompare(b.name),
        );
        break;
      case 'cheapest':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        filteredProducts = filteredProducts.sort((a, b) => b.year - a.year);
        break;
    }

    return filteredProducts;
  }

  function applyPagination(products: Product[]) {
    const filteredProducts: Product[] = [...products];

    if (itemsPerPage === null) {
      return filteredProducts;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredProducts.slice(startIndex, endIndex);
  }

  const handleSortOrderChange = (newSortOrder: string) => {
    setSearchParams((prevSearchParams) => {
      const updatedSearchParams = new URLSearchParams(prevSearchParams);

      updatedSearchParams.set('sort', newSortOrder);
      updatedSearchParams.set('page', '1');

      return updatedSearchParams;
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number | null) => {
    setSearchParams((prevSearchParams) => {
      const updatedSearchParams = new URLSearchParams(prevSearchParams);

      updatedSearchParams.set('itemsPerPage', newItemsPerPage?.toString()
        || 'all');
      updatedSearchParams.set('page', '1');

      return updatedSearchParams;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prevSearchParams) => {
      const updatedSearchParams = new URLSearchParams(prevSearchParams);

      updatedSearchParams.set('page', newPage.toString());

      return updatedSearchParams;
    });
  };

  const sortedAndFilteredProducts = applySortingAndFiltering(productData);
  const paginatedProducts = applyPagination(sortedAndFilteredProducts);

  return (
    <div className="Phonespage" data-cy="productList">
      <div className="Phonespage_container">
        <div className="Phonespage_currentpage">
          <Link to="/" className="Phonespage_currentpage_homelink" />
          <p className="Phonespage_currentpage_arrow" />
          <p className="Phonespage_currentpage_pagename">Phones</p>
        </div>

        <h1 className="Phonespage_title">Mobile phones</h1>
        <p className="Phonespage_modelslength">{`${productData.length} models`}</p>

        <div className="Phonespage_selections">
          <div className="Phonespage_selections_sorting">
            <label
              htmlFor="sortOrder"
              className="Phonespage_selections_sorting_label"
            >
              Sort Order:
            </label>
            <select
              id="sortOrder"
              value={sort}
              onChange={(e) => handleSortOrderChange(e.target.value)}
              className="Phonespage_selections_sorting_selection"
            >
              <option value="default">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>

          <div className="Phonespage_selections_itemscount">
            <label
              htmlFor="itemsPerPage"
              className="Phonespage_selections_itemscount_label"
            >
              Items Per Page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage || 'all'}
              onChange={(e) => handleItemsPerPageChange(
                e.target.value === 'all' ? null : parseInt(e.target.value, 10),
              )}
              className="Phonespage_selections_itemscount_selection"
            >
              <option value="all">All</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>

        <div className="Phoneswindow">
          {isLoading ? (
            <Loader style={{ width: '240px', height: '240px' }} />
          ) : (
            paginatedProducts.length > 0
            && paginatedProducts.map((product) => (
              <div className="Phoneswindow_product" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
          {!isLoading && paginatedProducts.length === 0 && (
            <h1 className="Phonespage_nophone">No phone was found</h1>
          )}
        </div>

        {paginatedProducts.length > 0 && (
          <Pagination
            total={sortedAndFilteredProducts.length}
            perPage={itemsPerPage || sortedAndFilteredProducts.length}
            currentPage={currentPage}
            onPageChange={(newPage) => handlePageChange(newPage)}
          />
        )}
      </div>
    </div>
  );
};
