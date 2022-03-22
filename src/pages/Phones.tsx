import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { SortedSlider } from '../components/SortedSlider';
import { Pagination } from '../components/Pagination';
import { NoResult } from '../components/NoResult';
import { Phone } from '../components/ProductCard';

type Props = {
  favorite: string[],
  cart: string[],
  phonesList: Phone[],
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
};

export const Phones: React.FC<Props> = ({
  favorite,
  cart,
  phonesList,
  handleCart,
  handleFavorite,
}) => {
  const params = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [inputClose, setInputClose] = useState(true);
  const [inputFilled, setInputFilled] = useState(false);

  const page = searchParams.get('page') || 1;
  const initialPerPage = searchParams.get('perPage') || phonesList.length;
  const perPage = initialPerPage === 'all' ? phonesList.length : initialPerPage;
  const sort = searchParams.get('sort');
  const queryValue = searchParams.get('query') || '';

  const filteredList
    = phonesList.filter((item: Phone) => (item.name.toLowerCase()
      .includes(queryValue.toLowerCase())));

  const lastItemIndex = +page * +perPage;
  const firstItemIndex = lastItemIndex - +perPage;
  const fragment = [...filteredList].splice(firstItemIndex, +perPage);

  const sortingList = (type: string) => {
    switch (type) {
      case 'name':
        fragment.sort((a: Phone, b: Phone) => a.name.localeCompare(b.name));
        break;

      case 'age':
        fragment.sort((a: Phone, b: Phone) => a.age - b.age);
        break;

      case 'price':
        fragment.sort((a: Phone, b: Phone) => {
          return (a.discount !== 0 ? Math.floor(a.price - (a.price * (a.discount / 100))) : a.price)
            - (b.discount !== 0 ? Math.floor(b.price - (b.price * (b.discount / 100))) : b.price);
        });
        break;

      default:
        break;
    }
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        setInputFilled(true);
        setInputClose(false);
      }

      const pageValue = searchParams.get('page') || '';
      const sortValue = searchParams.get('sort') || '';
      const perPageValue = searchParams.get('perPage') || '';

      const newParams: any = {};

      if (pageValue) {
        newParams.page = pageValue;
      }

      if (sortValue) {
        newParams.sort = sortValue;
      }

      if (perPageValue) {
        newParams.perPage = perPageValue;
      }

      if (newQuery) {
        newParams.query = newQuery;
      }

      setSearchParams(newParams);
    }, 1000), [],
  );

  const HandleQueryChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value);
    applyQuery(event.currentTarget.value);
  };

  const sortedList = sort ? sortingList(sort) : fragment;

  return (
    <>
      <div className="product-page__search">
        <input
          type="text"
          className={classNames('product-page__search-input',
            { 'product-page__search-input--filled': inputFilled })}
          value={query}
          onChange={HandleQueryChange}
          placeholder={`Search in ${params.pathname.slice(1)}...`}
        />
        <button
          type="button"
          className="product-page__search-close"
          hidden={inputClose}
          onClick={() => {
            setInputFilled(false);
            setInputClose(true);
            setQuery('');
            searchParams.delete('query');
            setSearchParams(searchParams);
          }}
        >
          { }
        </button>
      </div>
      {
        phonesList.length > 0 ? (
          <>
            <div className="product-page__link-container">
              <Link to="/" className="product-page__link" />
              <div className="product-page__arrow" />
              <div className="product-page__title">Phones</div>
            </div>
            <h2 className="section__title product-page__section-title">Mobile phones</h2>
            <div className="section__counter">{`${phonesList.length} models`}</div>
            <SortedSlider
              favorite={favorite}
              cart={cart}
              list={sortedList || fragment}
              handleCart={handleCart}
              handleFavorite={handleFavorite}
            />
            {perPage && (
              <Pagination numberOfPages={Math.ceil(filteredList.length / +perPage)} />
            )}
          </>
        ) : (
          <NoResult />
        )
      }
    </>

  );
};
