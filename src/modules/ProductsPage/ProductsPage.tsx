import classNames from 'classnames';
import styles from './ProductsPage.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getSearchWith } from '../../utils/searchHelper';
import { QueryParams } from '../../types/QueryParams';
import { Navigation } from '../components/Navigation';
import { getItemList } from '../../api';
import { DispatchContext, StateContext } from '../../Store';
import { ProductsSkeleton } from './ProductsSkeleton';
import { ErrorPage } from '../components/ErrorPage';
import { Placeholder } from '../components/Placeholder';
import { Product } from '../../types/Product';
import { ProductList } from './components/ProductList/ProductList';

const AMOUNT = 'amount';
const DATE = 'date';

type Props = {
  header: string;
  path: string;
};

export const ProductsPage: React.FC<Props> = ({ header, path }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(QueryParams.Sort) || '';
  const amountProducts = searchParams.get(QueryParams.PerPage) || '';
  const page = searchParams.get(QueryParams.Page) || '';
  const query = searchParams.get(QueryParams.Query) || '';

  const [amount, setAmount] = useState(amountProducts || 'all');
  const [hasAmount, setHasAmount] = useState(false);
  const [date, setDate] = useState(sort || 'Newest');
  const [hasDate, setHasDate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasError, setHasError] = useState(false);

  const dispatch = useContext(DispatchContext);
  const { phones, tablets, accessories, isLoading } = useContext(StateContext);

  const amountRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({ type: 'setIsLoading', value: true });

    getItemList(path)
      .then(data => {
        switch (path) {
          case 'tablets':
            dispatch({ type: 'setTablets', payload: data });
            break;

          case 'accessories':
            dispatch({ type: 'setAccessories', payload: data });
            break;

          default:
            dispatch({ type: 'setPhones', payload: data });
        }
      })
      .catch(() => setHasError(true))
      .finally(() => {
        dispatch({ type: 'setIsLoading', value: false });
      });
  }, [dispatch, path]);

  const preparedItems = useCallback(() => {
    let products = [];

    switch (path) {
      case 'tablets':
        products = tablets;
        break;
      case 'accessories':
        products = accessories;
        break;
      default:
        products = phones;
    }

    return [...products].sort((a, b) => {
      if (sort === 'Newest') {
        return b.year - a.year;
      }

      if (sort === 'Latest') {
        return a.year - b.year;
      }

      return 0;
    });
  }, [accessories, path, phones, sort, tablets]);

  const arragedItems = () => {
    return preparedItems().filter((item: Product) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const totalPages = Math.ceil(preparedItems().length / +amount);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        amountRef.current &&
        !amountRef.current.contains(event.target as Node) &&
        dateRef.current &&
        !dateRef.current.contains(event.target as Node)
      ) {
        setHasAmount(false);
        setHasDate(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    if (page) {
      setCurrentPage(+page);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [page]);

  const onClickField = (type: string) => {
    switch (type) {
      case AMOUNT:
        setHasAmount(!hasAmount);
        break;

      case DATE:
        setHasDate(!hasDate);
        break;
    }
  };

  return (
    <>
      {isLoading && !hasError && <ProductsSkeleton />}

      {hasError && !isLoading && <ErrorPage />}

      {!isLoading && !hasError && !!preparedItems.length && <Placeholder />}

      {!hasError && !isLoading && (
        <>
          <Navigation category={path} />

          <div className={classNames(styles.container, styles.products)}>
            <h1 className={styles.pageHead}>{header}</h1>

            <span
              className={styles.pageNumbers}
            >{`${arragedItems().length} items`}</span>

            {!!arragedItems().length && (
              <div className={classNames(styles.products__sort, styles.sort)}>
                <div
                  className={classNames(
                    styles.sort__dropDown,
                    styles['sort__dropDown-date'],
                  )}
                  onClick={() => onClickField(DATE)}
                  ref={dateRef}
                >
                  <span className={styles.sort__label}>Sort by</span>
                  <div
                    className={classNames(styles.sort__selectField, {
                      [styles['sort__selectField-active']]: hasDate,
                    })}
                  >
                    {date}
                  </div>
                  {hasDate && (
                    <div className={styles.sort__selectList}>
                      {['Newest', 'Latest'].map(item => (
                        <Link
                          key={item}
                          className={styles.sort__option}
                          to={{
                            search: getSearchWith(searchParams, { sort: item }),
                          }}
                          onClick={() => setDate(item)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={classNames(
                    styles.sort__dropDown,
                    styles['sort__dropDown-amount'],
                  )}
                  onClick={() => onClickField(AMOUNT)}
                  ref={amountRef}
                >
                  <span className={styles.sort__label}>Items on page</span>
                  <div
                    className={classNames(styles.sort__selectField, {
                      [styles['sort__selectField-active']]: hasAmount,
                    })}
                  >
                    {amount}
                  </div>

                  {hasAmount && (
                    <div className={styles.sort__selectList}>
                      {['4', '8', '16', 'all'].map(num => (
                        <Link
                          key={num}
                          className={styles.sort__option}
                          to={{
                            search: getSearchWith(searchParams, {
                              perPage: `${num}`,
                            }),
                          }}
                          onClick={() => setAmount(num)}
                        >
                          {num}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <ProductList
              total={totalPages}
              perPage={amount}
              currentPage={currentPage}
              onPageChange={(position: number) => setCurrentPage(position)}
              items={arragedItems()}
            />
          </div>
        </>
      )}
    </>
  );
};
