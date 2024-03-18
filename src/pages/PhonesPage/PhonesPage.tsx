import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { sortProducts } from '../../helpers/sortProducts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as pagination from '../../helpers/pagination';
import { thunkGetPhones } from '../../features/product/productsSlice';
// import { SortBy } from '../../types/SortBy';
// import { PerPage } from '../../types/PerPage';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { NoResults } from '../../components/NoResults';
import { Loader } from '../../components/Loader';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();

  const { phones, loading, error } = useAppSelector(state => state.phones);
  const dispatch = useAppDispatch();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const loadPhones = useCallback(() => {
    dispatch(thunkGetPhones());
  }, [dispatch]);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const correctPerPage = () => {
    return perPage === 'all' ? phones.length : +perPage;
  };

  const [from, to] = [
    pagination.getFirstItem(correctPerPage(), +page),
    pagination.getLastItem(correctPerPage(), +page, phones.length),
  ];

  const phonesWithQuery = sortProducts(sortBy, phones).filter(phone =>
    phone.name.toLowerCase().includes(query.toLowerCase().trim()),
  );
  const phonesToRender = sortProducts(sortBy, phones).slice(from, to);

  if (phonesWithQuery.length === 0 && !loading) {
    return <NoResults />;
  }

  if (loading && !error) {
    return (
      <div className="phones-page phones-page--loading">
        <Loader />
      </div>
    );
  }

  return (
    <div className="phones-page">
      {!query ? (
        <>
          <div className="phones-page__top">
            <h1 className="phones-page__title title">Mobile phones</h1>

            <p className="phones-page__models">{`${phones.length} models`}</p>
          </div>

          <div className="phones-page__content" data-cy="productList">
            {phonesToRender.map(phone => (
              <ProductCard product={phone} key={phone.id} />
            ))}
          </div>

          {perPage !== 'all' && (
            <div className="phones-page__pagination">
              <Pagination
                total={phones.length}
                perPage={correctPerPage()}
                currentPage={+page}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="phones-page__top">
            <h1 className="phones-page__title title">Mobile phones</h1>

            <p className="phones-page__models">
              {`${phonesWithQuery.length} models from search result`}
            </p>
          </div>

          <div className="phones-page__content">
            {phonesWithQuery.slice(from, to).map(phone => (
              <ProductCard product={phone} key={phone.id} />
            ))}
          </div>

          {perPage !== 'all' && (
            <div className="phones-page__pagination">
              <Pagination
                total={phonesWithQuery.length}
                perPage={correctPerPage()}
                currentPage={+page}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
