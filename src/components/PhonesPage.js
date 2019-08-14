import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import shortid from 'shortid';
import Loader from './Loader';
import PhoneCatalog from './PhoneCatalog';
import PhoneDetailsPage from './PhoneDetailsPage';
import Filter from './Filter';
import Basket from './Basket';
import Pagination from './Pagination';

const getPageNumbers = (itemsPerPage, itemsNumber) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(itemsNumber / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

/* eslint-disable-next-line */
const PhonesPage = ({ history, location }) => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [phonesLoaded, setPhonesLoader] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumbers, setPageNumbers] = useState([]);

  const selectOptions = [3, 5, 10, 20];

  const { search } = location;

  useEffect(() => {
    (async() => {
      try {
        // eslint-disable-next-line max-len
        const data = await fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
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

    if (localStorage.getItem('basketItems')) {
      setBasketItems(JSON.parse(localStorage.getItem('basketItems')));
    }

    setPhonesLoader(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
  }, [basketItems]);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    const queryValue = searchParams.get('query') || '';
    const sortValue = searchParams.get('sort') || '';
    const page = searchParams.get('page') || '';
    const perPage = searchParams.get('perPage') || '';

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
  }, [searchValue, sortType, itemsPerPage]);

  const onAddToBasket = (phoneId, phoneName) => {
    const items = [...basketItems];
    const itemIndex = items.findIndex(phone => phone.id === phoneId);

    if (itemIndex > -1) {
      items[itemIndex] = {
        ...items[itemIndex],
        quantity: items[itemIndex].quantity + 1,
      };
      setBasketItems(items);
    } else {
      setBasketItems([...items, { id: phoneId, name: phoneName, quantity: 1 }]);
    }
  };

  const onRemoveFormBasket = (phoneId) => {
    setBasketItems(
      basketItems.filter(item => item.id !== phoneId)
    );
  };

  const onChangeQuantity = (actionName, basketItemId) => {
    const items = [...basketItems];
    const itemIndex = [...basketItems]
      .findIndex(phone => phone.id === basketItemId);

    switch (actionName) {
      case 'increase':
        items[itemIndex] = {
          ...items[itemIndex],
          quantity: items[itemIndex].quantity + 1,
        };
        setBasketItems(items);
        break;
      case 'decrease':
        if (items[itemIndex].quantity >= 2) {
          items[itemIndex] = {
            ...items[itemIndex],
            quantity: items[itemIndex].quantity - 1,
          };
          setBasketItems(items);
        }

        break;
      default:
        setBasketItems(items);
    }
  };

  const getSearchValue = (event) => {
    setCurrentPage(1);
    setSearchValue(event.target.value.toLowerCase());
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
        <Basket
          basketItems={basketItems}
          onChangeQuantity={onChangeQuantity}
          onRemoveFormBasket={onRemoveFormBasket}
        />
        <Route
          path="/phones/"
          exact
          render={() => (
            <>
              <form>
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label
                  className="custom-form-control"
                  htmlFor="formControlSelect"
                >
                  Show
                  <select
                    onChange={onSelectChange}
                    id="formControlSelect"
                    className="form-control"
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
                  countries
                </label>
              </form>
              <Pagination
                buttons={pageNumbers}
                currentPage={currentPage}
                withInfo={paginationInfo}
                onPageChange={onPageChange}
              />
            </>
          )}
        />
      </div>
      <div>
        <h1 className="title indent-mb-m">Phone catalog</h1>
        {
          phonesLoaded
            ? (
              <div>
                <Switch>
                  <Route
                    path="/phones/:id"
                    exact
                    render={({ match }) => (
                      <PhoneDetailsPage
                        match={match}
                        history={history}
                        onAddToBasket={onAddToBasket}
                      />
                    )}
                  />
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
                </Switch>
              </div>
            ) : (
              <Loader />
            )
        }
      </div>
    </section>
  );
};

export default PhonesPage;
