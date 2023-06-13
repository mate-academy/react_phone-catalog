/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import {
  useState, useEffect, Fragment, useMemo,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Dropdown } from '../Dropdown';
import { getProductsFromServer } from '../../helpers/fuctions/fetchProduct';
import { SortBy, sortProducts } from '../../helpers/fuctions/sortProducts';
import { Product } from '../../helpers/types/Product';
import { SelectedItem } from '../../helpers/types/SelectedItem';
import { getSearchWith } from '../../helpers/fuctions/searchHelper';
import useDebounce from '../../helpers/fuctions/useDebonce';

export const PhonesCatalog = () => {
  const [phonesList, setPhonesList] = useState<Product[] | []>([]);
  const [totalPhones, setTotalPhones] = useState(0);

  const sortBy = [
    { title: 'Default', value: 'Default', query: '' },
    { title: SortBy.Age, value: 'age', query: 'age' },
    { title: SortBy.Name, value: 'name', query: 'name' },
    { title: SortBy.Cheapest, value: 'price', query: 'price' },
  ];

  const pages = [
    { title: '4', value: 4, query: '4' },
    { title: '8', value: 8, query: '8' },
    { title: '16', value: 16, query: '16' },
    { title: 'all', value: totalPhones, query: 'all' },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const [phonesPerPage, setPhonesPerPage] = useState(pages[2].value);
  const [selectedSorting, setSelectedSorting]
= useState<SelectedItem>(sortBy[0]);

  const [pagesArr, setPagesArr] = useState([1]);
  const [currPage, setCurrPage] = useState(
    +(searchParams.get('page') || 1),
  );
  const firstItemPerPage = (currPage - 1) * (phonesPerPage);
  const lastItemPerPage = (
    currPage * (phonesPerPage) > totalPhones
      ? totalPhones
      : currPage * (phonesPerPage)
  );

  const query = searchParams.get('query') || '';
  const appliedQury = useDebounce(query, 500);

  async function getPhones() {
    const products = await getProductsFromServer();

    setPhonesList(products.filter(pr => pr.category === 'phones'));
  }

  const handleFilterSelect = (selectedItem: SelectedItem) => {
    setSelectedSorting(selectedItem);
  };

  const handlePageSelect = (selectedItem: SelectedItem) => {
    setPhonesPerPage(+selectedItem.value);
  };

  const handlePageClick = (page: number) => {
    setCurrPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLeftClick = () => {
    const newSearchParams = getSearchWith(
      searchParams, { page: `${currPage - 1}`, perPage: `${phonesPerPage}` },
    );

    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrPage(currPage - 1);
  };

  const handleRightClick = () => {
    const newSearchParams = getSearchWith(
      searchParams, { page: `${currPage + 1}`, perPage: `${phonesPerPage}` },
    );

    setSearchParams(newSearchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrPage(currPage + 1);
  };

  const sortedPhonesList = useMemo(() => {
    let filteredArray = [...phonesList];

    if (selectedSorting.title === 'Default' && !appliedQury) {
      setTotalPhones(phonesList.length);

      return phonesList;
    }

    if (appliedQury?.trim() !== '' && appliedQury !== null) {
      setCurrPage(1);
      filteredArray = filteredArray.filter(pr => {
        return appliedQury?.toLowerCase().split(' ').every(word => {
          return pr.name.toLowerCase().includes(word);
        });
      });
    }

    setTotalPhones(filteredArray.length);

    if (selectedSorting.title) {
      return sortProducts(filteredArray, selectedSorting.title);
    }

    return filteredArray;
  }, [selectedSorting.title, phonesList.length, appliedQury]) || [];

  useEffect(() => {
    const totalPages = Math.ceil(totalPhones / +phonesPerPage);
    const arr = [];

    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }

    setPagesArr(arr);
    setPhonesPerPage(pages.find(
      item => item.title === searchParams.get('perPage'),
    )?.value || 16);
  }, [totalPhones, phonesPerPage]);

  useEffect(() => {
    getPhones();
    setSelectedSorting(sortBy.find(
      item => item.query === searchParams.get('sort'),
    ) || sortBy[0]);
  }, []);

  return (
    <article className="phones-catalog">
      <h1 className="phones-catalog__title">Mobile phones</h1>

      <p className="phones-catalog__amount">
        {totalPhones} model{totalPhones > 1 ? 's' : ''}
      </p>

      <div className="phones-catalog__dropdowns-container">
        <div className="phones-catalog__dropdown">
          <p className="phones-catalog__dropdown-title">Sort by</p>
          <Dropdown
            itemsList={sortBy}
            value={selectedSorting.title}
            filteredBy="sort"
            callback={handleFilterSelect}
          />
        </div>

        <div className="phones-catalog__dropdown">
          <p className="phones-catalog__dropdown-title">Items on page</p>
          <Dropdown
            itemsList={pages}
            value={pages.find(
              item => item.title === searchParams.get('perPage'),
            )?.title || 16}
            filteredBy="perPage"
            callback={handlePageSelect}
          />
        </div>
      </div>

      <div
        className="phones-catalog__producst-container products-grid"
        data-cy="productList"
      >
        {sortedPhonesList?.slice(firstItemPerPage, lastItemPerPage)
          .map(phone => (
            <Fragment key={phone.id}>
              <ProductCard product={phone} />
            </Fragment>
          ))}
      </div>

      {(sortedPhonesList?.length > phonesPerPage) && (
        <div className="phones-catalog__pagination-container">
          <button
            type="button"
            aria-label="Mute volume"
            className="
              phones-catalog__button-left
              icon-button"
            onClick={handleLeftClick}
            disabled={currPage === 1}
            data-cy="paginationLeft"
          />

          <div className="phones-catalog__pages-container">
            {pagesArr.map(page => (
              <Link
                key={page}
                to={{
                  search: getSearchWith(searchParams,
                    { page: `${page}`, perPage: `${phonesPerPage}` }),
                }}
                className={classNames(
                  'phones-catalog__pagination-button',
                  'icon-button',
                  {
                    'phones-catalog__pagination-button--is-active':
                  page === currPage,
                  },
                )}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Mute volume"
            className="
              phones-catalog__button-right
              icon-button"
            onClick={handleRightClick}
            disabled={currPage === pagesArr[pagesArr.length - 1]}
            data-cy="paginationRight"
          />
        </div>
      )}
    </article>
  );
};
