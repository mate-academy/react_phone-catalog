import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTablets } from '../../helpers/apis';
import './TabetsPage.scss';
import Loader from '../../components/Loader/Loader';

export const TabletsPage = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const itemsPerPage = parseInt(searchParams.get('itemsPerPage') || '0', 10)
    || null;

  useEffect(() => {
    setIsLoading(true);
    getTablets('products.json')
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

  return (
    <div className="Parentcontainer">
      <div className="Tabletspage">
        <div className="Phonespage_currentpage">
          <Link to="/" className="Phonespage_currentpage_homelink" />
          <p className="Phonespage_currentpage_arrow" />
          <p className="Phonespage_currentpage_pagename">Tablets</p>
        </div>

        <h1 className="Phonespage_title">Tablets</h1>
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
        {isLoading
          ? <Loader style={{ width: '240px', height: '240px' }} />
          : (
            <h1 className="Tabletspage_message">All tablets run out</h1>
          )}
      </div>
    </div>
  );
};
