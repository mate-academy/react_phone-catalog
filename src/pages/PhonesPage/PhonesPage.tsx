import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './style.scss';
import { PhonesContext } from '../../store/PhonesContext';
import { sortOptions } from '../../utils/sortOptions';
import { perPageOptions } from '../../utils/perPageOptions';
import { Titles } from '../../types/Titles';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { ListSelect } from '../../components/ListSelect/ListSelect';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';

export const PhonesPage = () => {
  const { phones, loading, isError } = useContext(PhonesContext);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '16';
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const sortedPhones = useMemo(() => {
    return [...phones].sort((first, second) => {
      switch (sort) {
        case 'name':
          return first.name.localeCompare(second.name);
        case 'price':
          return Number(first.price) - Number(second.price);
        default:
          return Number(second.year) - Number(first.year);
      }
    });
  }, [sort, phones]);

  const filteredPhones = useMemo(() => {
    return query.trim()
      ? phones.filter(({ name }) => {
        return name.toLowerCase().includes(query.trim().toLowerCase());
      })
      : phones;
  }, [phones, query]);

  const visiblePhones = useMemo(() => {
    if (perPage === 'All') {
      return sortedPhones;
    }

    const total = sortedPhones.length;
    const maxItem = Number(page) * Number(perPage);
    const firstItem = maxItem - Number(perPage);
    const lastItem = maxItem > total
      ? total
      : maxItem;

    return sortedPhones.slice(firstItem, lastItem);
  }, [sortedPhones, page, perPage]);

  return (
    <section className="phones-page">
      {!query.trim() ? (
        <>
          <div className="phones-page__breadcrumbs">
            <Breadcrumbs />
          </div>
          <h1 className="phones-page__title">{Titles.MP}</h1>
          {loading && <Loader />}
          {!loading && isError && <ErrorMessage />}
          {!loading && !isError && (
            <>
              <h3 className="phones-page__length">{`${phones.length} Models`}</h3>
              <div className="phones-page__selects">
                <ListSelect
                  options={sortOptions}
                  description="Sort By"
                />
                <ListSelect
                  options={perPageOptions}
                  description="Items on page"
                />
              </div>
              <div className="phones-page__list">
                <ProductsList products={visiblePhones} />
              </div>
              <div className="phones-page__pagination">
                {sortedPhones.length > Number(perPage) && perPage !== 'All' && (
                  <Pagination
                    total={sortedPhones.length}
                    perPage={Number(perPage)}
                    currentPage={Number(page)}
                  />
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {filteredPhones.length > 0 ? (
            <>
              <h3 className="phones-page__length">
                {`${filteredPhones.length} results`}
              </h3>
              <div className="phones-page__list">
                <ProductsList products={filteredPhones} />
              </div>
            </>
          ) : (
            <NoSearchResults section="phones" />
          )}
        </>
      )}
    </section>
  );
};
