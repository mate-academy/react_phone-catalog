import {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GlobalContext } from '../store/GlobalContext';
import { ICONS } from '../icons';
import { Loader } from '../components/Loader';
import { Dropdown } from '../components/Dropdown';
import { ProductsList } from '../components/ProductsList';
import { ITEMS_ON_PAGE, SORT_BY } from '../utils/const';
import { Pagination } from '../components/Pagination';
import { getFilteredPhones } from '../helpers/getFilterdPhones';
import { NoSearchResults } from '../components/NoSearchResults';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();
  const { products } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sortBy = searchParams.get('sortBy') || SORT_BY[0].id;
  const perPage = searchParams.get('perPage') || ITEMS_ON_PAGE[1].id;
  const page = +(searchParams.get('page') || '1');
  const query = searchParams.get('query') || '';

  const sortedPhones = getFilteredPhones(
    products,
    { sortBy, query, filter: 'phones' },
  );

  const timerId = useRef(0);

  useEffect(() => {
    setIsLoading(true);
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [page, perPage]);

  const TOTAL_AMOUNT = sortedPhones.length;
  const begin = (page * +perPage) - +perPage;
  const end = Math.min(+begin + +perPage, TOTAL_AMOUNT);

  return (
    <div className="container">
      <div className="phones-page App__phones-page">
        <div className="page-navigation">
          <Link to="/" className="page-navigation__link">
            <img src={ICONS.home_icon} alt="to home page" className="icon" />
          </Link>

          <img src={ICONS.arrow} alt="icon" className="icon icon--right" />

          <p
            className="page-navigation__text"
          >
            Phones
          </p>
        </div>

        <div className="phones-page__title">
          <h1 className="title title--h1">Mobile phones</h1>

          <p className="phones-page__info">
            {`${products.length} models`}
          </p>
        </div>

        <div className="phones-page__sort">
          <div className="phones-page__wrap">
            <Dropdown
              title="Sort by"
              DATA={SORT_BY}
              option={sortBy}
              paramName="sortBy"
            />
            <Dropdown
              title="Items on page"
              DATA={ITEMS_ON_PAGE}
              option={perPage}
              paramName="perPage"
            />
          </div>

          {isLoading && <Loader />}

          {!isLoading && !TOTAL_AMOUNT && <NoSearchResults />}

          {!isLoading && !!TOTAL_AMOUNT && (
            <div className="productList" data-cy="productList">
              <ProductsList
                phones={
                  perPage === 'all'
                    ? sortedPhones
                    : sortedPhones.slice(begin, end)
                }
              />
            </div>
          )}
        </div>

        {!isLoading && !!TOTAL_AMOUNT && (
          <div className="pagination">
            <Pagination
              total={TOTAL_AMOUNT}
              perPage={+perPage}
              currentPage={+page}
            />
          </div>
        )}
      </div>
    </div>
  );
};
