import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import shortid from 'shortid';
import Loader from './Loader';
import PhoneCatalog from './PhoneCatalog';
import Filter from './Filter';
import Pagination from './Pagination';
import getPageNumbers from '../helpers/getPagesNumbers';
import SplittedText from './SplittedText';

/* eslint-disable-next-line */
const PhonesPage = ({ history, location, onAddToBasket }) => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [phonesLoaded, setPhonesLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState([]);

  const selectOptions = [3, 5, 10, 20];

  const { search } = location;
  const URL = 'https://mate-academy.github.io/'
    + 'phone-catalogue-static/api/phones.json';

  useEffect(() => {
    (async() => {
      try {
        const data = await fetch(URL);
        const phonesData = await data.json();

        setPhones(phonesData);
        const searchParams = new URLSearchParams(search);

        const queryValue = searchParams.get('query') || '';
        const sortValue = searchParams.get('sort') || '';
        const page = searchParams.get('page') || 1;
        const perPage = searchParams.get('perPage') || 5;

        setSearchValue(queryValue);
        setSortType(sortValue);
        setCurrentPage(+page);
        setItemsPerPage(+perPage);
        const sortedPhones = getSortedPhonesBy(
          getFilteredPhones(phonesData, queryValue),
          sortValue
        );

        setPageNumbers(getPageNumbers(perPage,
          sortedPhones.length));

        setFilteredPhones(sortedPhones);
      } catch (error) {
        setPhones([]);
      }
    })();

    setPhonesLoader(true);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const queryValue = searchParams.get('query') || searchValue;
    const sortValue = searchParams.get('sort') || sortType;
    const page = searchParams.get('page') || currentPage;
    const perPage = searchParams.get('perPage') || itemsPerPage;

    setCurrentPage(page);
    setItemsPerPage(perPage);
    setSearchValue(queryValue);
    setSortType(sortValue);
  }, [history]);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    searchParams.append('query', searchValue.toString());
    searchParams.append('sort', sortType.toString());
    searchParams.append('page', currentPage.toString());
    searchParams.append('perPage', itemsPerPage.toString());

    if (search !== `?${searchParams.toString()}`) {
      history.push({
        pathname: '/phones/',
        search: `?${searchParams.toString()}`,
      });
    }

    const sortedPhones = getSortedPhonesBy(
      getFilteredPhones(phones, searchValue),
      sortType
    );

    setFilteredPhones(sortedPhones);
    setPageNumbers(getPageNumbers(itemsPerPage,
      sortedPhones.length));
  }, [searchValue, sortType, itemsPerPage, currentPage]);

  const getSearchValue = (text) => {
    setCurrentPage(1);
    setSearchValue(text.toLowerCase());
  };

  const getSortType = (event) => {
    setSortType(event.target.value);
  };

  const getSortedPhonesBy = (phonesAfterFilter, type) => {
    switch (type) {
      case 'name':
        return phonesAfterFilter.sort((a, b) => a.name.localeCompare(b.name));

      case 'age':
        return phonesAfterFilter.sort((a, b) => a.age - b.age);

      default:
        return phonesAfterFilter;
    }
  };

  const getFilteredPhones = (phonesToFilter, value) => phonesToFilter.filter(
    ({ name, snippet }) => (
      [name, snippet].join('').toLowerCase().includes(value.trim()))
  );

  const onPageChange = (event) => {
    const { name, id } = event.target;

    setPageNumbers(getPageNumbers(itemsPerPage, filteredPhones.length));
    if (name.toLowerCase().trim().includes('next')
      && currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else if (name.toLowerCase().trim().includes('prev') && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(+id);
    }
  };

  const onSelectChange = ({ target: { value } }) => {
    setItemsPerPage(+value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationInfo = `Showing ${
    filteredPhones.length > 0 ? indexOfFirstItem + 1 : 0
  } to ${
    indexOfLastItem > filteredPhones.length
      ? filteredPhones.length
      : indexOfLastItem
  }
    of ${filteredPhones.length} phones`;
  const currentPhonesForShowing = filteredPhones
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="section">
      <div>
        <div className="indent-mb-m">
          <h1 className="title title_subpages">
            <SplittedText text="Phones catalog" />
          </h1>
        </div>
        <div className="sidebar">
          <Route
            path="/phones/"
            exact
            render={() => (
              <Filter
                onFilterPhones={getSearchValue}
                onSortPhonesBy={getSortType}
                sortValue={sortType}
                searchValue={searchValue}
              />
            )}
          />
          <Route
            path="/phones/"
            exact
            render={() => (
              <>
                <form>
                  {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                  <div className="input-block">
                    {/* eslint-disable-next-line */}
                    <label
                      htmlFor="formControlSelect"
                    >
                      Show per page
                    </label>
                    <select
                      onChange={onSelectChange}
                      id="formControlSelect"
                      value={itemsPerPage}
                    >
                      {selectOptions.map(item => (
                        <option
                          key={shortid.generate()}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </>
            )}
          />
        </div>
        {
          phonesLoaded
            ? (
              <div>
                <Route
                  path="/phones/:queryParams?"
                  exact
                  render={({ match }) => (
                    <PhoneCatalog
                      match={match}
                      phones={currentPhonesForShowing}
                      onAddToBasket={onAddToBasket}
                    />
                  )}
                />
              </div>
            ) : (
              <Loader />
            )
        }
        <Route
          path="/phones/"
          exact
          render={() => (
            <Pagination
              buttons={pageNumbers}
              currentPage={currentPage}
              withInfo={paginationInfo}
              onPageChange={onPageChange}
            />
          )}
        />
      </div>
    </section>
  );
};

export default PhonesPage;
