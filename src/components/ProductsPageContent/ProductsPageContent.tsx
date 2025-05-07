/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable max-len */
import React, { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './ProductsPageContent.scss';
import { Product } from '../../types/Product';
import { ProductsList } from '../ProductsList';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductsType } from '../../types/ProductsType';
import { getSearchWith } from '../../helpers/searchHelper';
import { GeneralContext } from '../../helpers/GeneralContext';
import { NoSearchResults } from '../NoSearchResults';

type Props = {
  type: ProductsType,
  title: string,
  itemsList: Product[],
};

enum SortTypes {
  AGE = 'year',
  NAME = 'name',
  PRICE = 'price',
}

export const ProductsPageContent: React.FC<Props> = ({
  type,
  title,
  itemsList,
}) => {
  const { isLoading } = useContext(GeneralContext);
  const options = [16, 8, 4, 'All'];
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sort') || SortTypes.AGE;
  const perPage = searchParams.get('perPage') || options[0];
  const currentPage = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  function getItemsList() {
    let itemsListCopy = [...itemsList];

    if (query) {
      itemsListCopy = itemsListCopy.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    return itemsListCopy;
  }

  const filteredList = getItemsList();

  function getItemsPerPage() {
    return filteredList.sort((a: Product, b: Product) => {
      switch (sortType) {
        case SortTypes.NAME:
          return b[sortType].localeCompare(a[sortType]);

        case SortTypes.PRICE:
          return a[sortType] - b[sortType];

        case SortTypes.AGE:
          return b[sortType] - a[sortType];

        default:
          return 0;
      }
    })
      .filter((item, index) => {
        if (perPage !== 'All') {
          return index < +currentPage * +perPage
          && index >= +currentPage * +perPage - +perPage;
        }

        return item;
      });
  }

  const itemsPerPage = getItemsPerPage();
  const buttonsMax = perPage !== 'All'
    ? Math.ceil(filteredList.length / +perPage)
    : 1;
  const buttonsList = [];

  for (let i = 1; i <= buttonsMax; i += 1) {
    buttonsList.push(i);
  }

  const showPaginationBtns
    = !isLoading
    && filteredList.length > +perPage
    && buttonsMax > 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const selectSortType = (event:React.ChangeEvent<HTMLSelectElement>) => {
    if (perPage !== 'All') {
      setSearchWith({ sort: event.target.value, page: '1' });
    } else {
      setSearchWith({ sort: event.target.value });
    }
  };

  const selectChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== 'All') {
      setSearchWith({ page: '1', perPage: event.target.value });
    } else {
      setSearchWith({ page: null, perPage: event.target.value });
    }
  };

  const setCurrentPage = (button: number) => {
    setSearchWith({ page: button.toString() });
  };

  return (
    <section className="productsPageContent">
      <div className="productsPageContent__header">
        <div className="productsPageContent__breadcrumbs">
          <Link to="/" className="productsPageContent__goHome">
            <img
              src={require('../../images/icons/home.svg').default}
              alt="Home"
            />
          </Link>

          <img
            src={require('../../images/icons/slider-arrow-right-disabled.svg').default}
            alt="Arrow"
          />

          <span className="productsPageContent__type">
            {type}
          </span>
        </div>

        <h1 className="productsPageContent__title">{title}</h1>

        <h2 className="productsPageContent__amount">
          {`${filteredList.length} models`}
        </h2>
      </div>

      {itemsList.length !== 0
        ? (
          <div className="productsPageContent__selects">
            <div className="productsPageContent__wrapper">
              <label
                htmlFor="sortBy"
                className="productsPageContent__label"
              >
                Sort by
              </label>
              <select
                value={sortType}
                name="sortBy"
                id="sortBy"
                className="
                  productsPageContent__select
                  productsPageContent__select--sortBy
                "
                onChange={selectSortType}
              >
                <option value={SortTypes.AGE}>Newest</option>
                <option value={SortTypes.NAME}>Alphabetically</option>
                <option value={SortTypes.PRICE}>Cheapest</option>
              </select>
            </div>

            <div className="productsPageContent__wrapper">
              <label
                htmlFor="itemsOnPage"
                className="productsPageContent__label"
              >
                Items on page
              </label>
              <select
                value={perPage}
                name="itemsOnPage"
                id="itemsOnPage"
                className="
                  productsPageContent__select
                  productsPageContent__select--itemsOnPage
                "
                onChange={selectChange}
              >
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        )
        : (
          <div className="emptyMessage">
            This section is empty
          </div>
        )}

      {isLoading && <Loader />}
      {!isLoading && filteredList.length !== 0
        ? (
          <ProductsList
            itemsList={itemsPerPage}
            type={type}
          />
        )
        : (itemsList.length !== 0 && <NoSearchResults />)}

      {showPaginationBtns && (
        <Pagination
          buttonsList={buttonsList}
          onPageChange={(button) => setCurrentPage(button)}
          currentPage={+currentPage}
          buttonsMax={buttonsMax}
        />
      )}
    </section>
  );
};
