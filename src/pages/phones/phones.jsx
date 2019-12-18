/* eslint-disable max-len */
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../lib/constants';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import PaginationInfo from '../../components/Pagination/PaginationInfo';

class Phones extends React.Component {
  state = {
    phonesForShowing: [],
    sortBy: 'age',
    inputValue: '',
    page: 1,
    phonesPerPage: 20,
    pages: 1,
    arrOfPages: [1],
  };

  componentDidMount = () => {
    const params = new URLSearchParams(this.props.location.search);

    if (params.get('curpage')) {
      this.setState({
        page: Number(params.get('curpage')),
      });
    }

    if (params.get('perpage')) {
      this.setState({
        phonesPerPage: Number(params.get('perpage')),
      });
    }

    if (params.get('filter')) {
      this.setState({
        phonesForShowing: [...this.props.phones]
          .filter(phone => phone.id
            .toLowerCase().includes(params.get('filter').toLowerCase())),
        inputValue: params.get('filter'), // text in input
      });

      if (params.get('sort')) {
        this.sortFunctionByValue(params.get('sort'));
      }
    } else {
      this.setState({
        phonesForShowing: this.props.phones,
      });

      if (params.get('sort')) {
        this.sortFunctionByValue(params.get('sort'));
      }
    }

    this.calcQuantityAndArrOfPages();
  };

  componentDidUpdate = (prevProps) => {
    // query params section
    const curURLParams = new URLSearchParams(this.props.location.search);
    const prevURLParams = new URLSearchParams(prevProps.location.search);

    if (curURLParams.get('curpage') !== prevURLParams.get('curpage')) {
      this.setState({
        page: Number(curURLParams.get('curpage')),
      });
    }

    if (curURLParams.get('perpage') !== prevURLParams.get('perpage')) {
      this.setState({
        phonesPerPage: Number(curURLParams.get('perpage')),
      });
    }

    if (curURLParams.get('filter') !== prevURLParams.get('filter')) {
      this.setState({
        phonesForShowing: [...this.props.phones]
          .filter(phone => phone.id
            .toLowerCase().includes(curURLParams.get('filter').toLowerCase())),
        inputValue: curURLParams.get('filter'), // text in input
      });

      if (curURLParams.get('sort') !== prevURLParams.get('sort')) {
        this.sortFunctionByValue(curURLParams.get('sort'));
      } else {
        this.sortFunctionByValue(prevURLParams.get('sort'));
      }
    }

    if (curURLParams.get('sort') !== prevURLParams.get('sort')) {
      this.sortFunctionByValue(curURLParams.get('sort'));
    }
  };

  filterHandleInput = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value, // showing in input,
      phonesForShowing: this.props.phones
        .filter(phone => phone.id.toLowerCase().includes(value.toLowerCase())),
    });

    this.sortFunctionByValue(this.state.sortBy);
    this.calcQuantityAndArrOfPages();
    this.choosePage(1);
    this.setQueryParamsInURL('filter', value);
  };

  sortHandleSelect = (event) => {
    const { value } = event.target;

    this.sortFunctionByValue(value);
    this.choosePage(1);
    this.setQueryParamsInURL('sort', value);
  };

  chooseQuantityOfPhonesPerPage = (event) => {
    const { value } = event.target;

    this.setState({
      phonesPerPage: Number(value),
    });

    this.calcQuantityAndArrOfPages();
    this.choosePage(1);
    this.setQueryParamsInURL('perpage', value);
  };

  choosePage = (value) => {
    this.setState({
      page: value,
    }, () => {
      this.setQueryParamsInURL('curpage', value);
    });
  };

  sortFunctionByValue = (value) => {
    this.setState(prevState => ({
      sortBy: value,
      phonesForShowing: [...prevState.phonesForShowing].sort((a, b) => {
        const valueA = a[value];
        const valueB = b[value];

        switch (value) {
          case 'age':
            return valueA - valueB;
          case 'name':
            return valueA.localeCompare(valueB);
          default:
            return 0;
        }
      }),
    }));
  };

  setQueryParamsInURL = (paramsName, valueToSet) => {
    const params = new URLSearchParams(this.props.location.search);

    params.set(paramsName, valueToSet);

    // eslint-disable-next-line react/prop-types
    this.props.history.push({
      pathname: '/phones',
      search: `?${params.toString()}`,
    });
  };

  calcQuantityAndArrOfPages = () => {
    this.setState(prevState => ({
      pages: Math.ceil(prevState.phonesForShowing.length / prevState.phonesPerPage),
    }));

    this.setState((prevState) => {
      const arr = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= prevState.pages; i++) {
        arr.push(i);
      }

      return {
        arrOfPages: arr,
      };
    });
  };

  render() {
    const {
      phonesForShowing,
      phonesPerPage,
      page,
      pages,
      arrOfPages,
      inputValue,
      sortBy,
    } = this.state;
    const firstIndexPhoneOnCurrentPage = page === 1
      ? 0 // index of FIRST phone from filtered phonesForShowing
      : (page - 1) * phonesPerPage;
    const lastPossibleIndexPhoneOnCurPage = (page * phonesPerPage) - 1;

    return (
      <div className="phones-page">
        <h1 className="heading heading--l phones-page__quantity-phones">
          Phones Quantity:
          {phonesForShowing.length}
        </h1>

        <div className="phones-page__input-and-select-container">

          <input
            className="phones-page__filter"
            placeholder="Filter phones by name"
            value={inputValue}
            onChange={this.filterHandleInput}
            id="search_field"
            type="text"
          />

          <select
            className="phones-page__sort"
            value={sortBy}
            id="sort"
            onChange={this.sortHandleSelect}
          >
            <option value="age">Newest</option>
            <option value="name">Alphabetical</option>
          </select>

          <select
            className="phones-page__perpage"
            value={this.state.phonesPerPage}
            onChange={this.chooseQuantityOfPhonesPerPage}
            id="chooseQuantityOfPhonesPerPage"
          >
            <option value="20">Per Page: 20</option>
            <option value="10">Per Page: 10</option>
            <option value="5">Per Page: 5</option>
            <option value="3">Per Page: 3</option>
          </select>
        </div>

        <ul
          className="phones-page__list-of-phones" // временный
        >
          {
            phonesForShowing
              .filter((phone, index) => index >= firstIndexPhoneOnCurrentPage
                && index <= lastPossibleIndexPhoneOnCurPage)
              .map(phone => (
                <li
                  key={phone.id}
                  className="phone-card" // временный
                >
                  <div>
                    <Link to={`/phones/${phone.id}`}>
                      <img
                        className="phone-card__img" // временный
                        src={`${BASE_URL}/${phone.imageUrl}`}
                        alt={`${phone.id}`}
                      />
                    </Link>

                    <Link
                      className="phone-card__heading link link--phone-heading"
                      to={`/phones/${phone.id}`}
                    >
                      {phone.name}
                    </Link>

                    <section className="phone-card__snippet">
                      {phone.snippet}
                    </section>
                  </div>

                  <button
                    type="button"
                    className={
                      `phone-card__button button button--add-in-basket
                      ${this.props.itemsInBasket.find(item => item.id === phone.id)
                      && 'button--add-in-basket_added'}`
                    }
                    onClick={() => this.props.addItemToBasket(phone)}
                  >
                    {this.props.itemsInBasket.find(item => item.id === phone.id)
                      ? 'Added to basket'
                      : 'Add to basket'}
                  </button>
                </li>
              ))
          }
        </ul>

        {
          pages > 1
            ? (
              <div className="phones-page__pagination-container pagination">
                <PaginationInfo
                  page={page}
                  pages={pages}
                  phonesPerPage={phonesPerPage}
                  phonesForShowing={phonesForShowing}
                />

                <PaginationButtons
                  choosePage={this.choosePage}
                  page={page}
                  pages={pages}
                  arrOfPages={arrOfPages}
                />
              </div>
            )
            : ''
        }
      </div>
    );
  }
}

Phones.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  phones: PropTypes.arrayOf(PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.string,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    snippet: PropTypes.string,
  })).isRequired,
  addItemToBasket: PropTypes.func.isRequired,
  itemsInBasket: PropTypes.arrayOf(PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.string,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    snippet: PropTypes.string,
  })).isRequired,
};

export default Phones;
