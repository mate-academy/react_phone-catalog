import {
  useState, useMemo, useContext, useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationButton } from '../PaginationButton/PaginationButton';
import { PaginationPhone } from '../PaginationPhone/PaginationPhone';
import { ProductCard } from '../ProductCard/ProductCard';
import './Phone.scss';
import { SortInput } from '../SortInput/SortInput';
import { SortCategories } from '../../Type/sortCategory';
import { Search } from '../Search/Search';
import { HomeIcon } from '../HomeIcon/HomeIcon';
import { PhoneContext } from '../Context/contex';

export const Phone = () => {
  const { phones } = useContext(PhoneContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemOnPage, setItemOnPage]
  = useState(+(searchParams.get('itemOnPage') || 16));
  const [currentPage, setCurrentPage]
  = useState(+(searchParams.get('currentPage') || 1));
  const [sortValue, setSortValue]
  = useState((searchParams.get('sortValue') || SortCategories.newest));
  const [query, setQuery]
  = useState(searchParams.get('query') || '');
  const lastTotalIndex = currentPage * (itemOnPage);
  const firstTotalIndex = lastTotalIndex - itemOnPage;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', '1');
    setSearchParams(params);
    setCurrentPage(1);
  }, [sortValue, itemOnPage]);

  const visiblePhone = useMemo(() => {
    let preparedPhone = phones;

    if (query) {
      preparedPhone = preparedPhone.filter(
        phone => phone.name.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    if (sortValue) {
      preparedPhone = [...preparedPhone].sort((phone1, phone2) => {
        switch (sortValue) {
          case SortCategories.alphabetically:
            return (phone2.name.localeCompare(phone1.name));
            break;
          case SortCategories.cheapest:
            return phone1.fullPrice - phone2.fullPrice;
            break;
          case SortCategories.newest:
            return phone2.fullPrice - phone1.fullPrice;
            break;
          default:
            return 0;
        }
      });
    }

    return preparedPhone.slice(firstTotalIndex, lastTotalIndex);
  }, [phones, sortValue, currentPage, itemOnPage, query]);

  return (
    <main>
      <section className="phones">
        <div className="container">
          <HomeIcon title="Phones" />
          <h1>Mobile phones</h1>
          {visiblePhone.length === 0 && (
            <p className="phone__text"> There are not  models</p>
          )}
          {visiblePhone.length > 0 && query && (
            <p className="phone__text">{`${visiblePhone.length}  models`}</p>
          )}

          {visiblePhone.length > 0 && (
            <p className="phone__text">{`${phones.length}  models`}</p>
          )}
          <Search
            query={query}
            setQuery={setQuery}
          />
          {!query && (
            <div className="phones__input">
              <SortInput
                sortValue={sortValue}
                setSortValue={setSortValue}
              />
              <PaginationPhone
                itemOnPage={itemOnPage}
                setItemOnPage={setItemOnPage}
              />
            </div>
          )}
          <ul className="phones__list">
            {visiblePhone.map((phone) => (
              <li
                className="phones__item"
                data-cy="item"
                key={phone.id}
              >
                <ProductCard phone={phone} />
              </li>
            ))}
          </ul>

          {!query && (
            <PaginationButton
              total={phones.length}
              itemOnPage={itemOnPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </section>
    </main>
  );
};
