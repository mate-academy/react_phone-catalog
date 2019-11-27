import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { BASE_URL } from '../components/constants';
import Pagination from '../components/Pagination'

class PageOfPhones extends React.Component {
  state = {
    phonesForShowing: [],
    quantityOfPhones: this.props.phones.length,
    page: 1,
    phonesPerPage: 20,
    pages: 1,
    arrOfPages: [1],
  }

  componentDidMount = () => {
    // query params in URL + phones for showing
    let params = new URLSearchParams(this.props.location.search);
    if (params.get("filter")) {
      this.setState({
        phonesForShowing: this.props.phones
          .filter(phone => phone.id
            .toLowerCase().includes(params.get("filter").toLowerCase())),
      })
    } else {
      this.setState({
        phonesForShowing: this.props.phones,
      });
    };

    this.calcQuantityAndArrOfPages();
  };

  filterHandleInput = (event) => {
    const { value } = event.target;

    // query params is URL
    let params = new URLSearchParams(this.props.location.search);
    params.set("filter", `${value}`);

    this.props.history.push({
      pathname: "/phones",
      search: `?${params.toString()}`,
    })

    this.setState({
      phonesForShowing: this.props.phones
        .filter(phone =>
          phone.id.toLowerCase().includes(value.toLowerCase())),
    });
  };

  sortFunc = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      phonesForShowing: [...prevState.phonesForShowing].sort((a, b) => {
        const valueA = a[value];
        const valueB = b[value];

        switch (typeof valueA) {
          case 'string':
            return valueA.localeCompare(valueB);
          case 'number':
            return valueA - valueB;
          default:
            return 0;
        }
      }),
    }));
  };

  // for Pagination
  calcQuantityAndArrOfPages = () => {
    this.setState(prevState => ({
      pages: Math.ceil(prevState.quantityOfPhones / prevState.phonesPerPage),
    }));

    this.setState(prevState => {
      const arr = [];
      for (let i = 1; i <= prevState.pages; i++) {
        arr.push(i);
      };
      return {
        arrOfPages: arr,
      }
    })
  };

  // for Pagination
  choosePage = (value) => {
    this.setState({
      page: value,
    })
  };

  chooseQuantityOfPhonesPerPage = (event) => {
    const { value } = event.target;

    this.setState({
      phonesPerPage: value,
    });
  };



  render() {
    const {
      phonesForShowing,
      quantityOfPhones,
      page,
      phonesPerPage,
      arrOfPages,
      pages,
    } = this.state;

    console.log(phonesForShowing);

    const firstPhoneOnCurrentPage = this.state.page === 1
      ? 0 // index of FIRST phone from filtered phonesForShowing
      : (this.state.page - 1) * this.state.phonesPerPage;
    // index of LAST phone from filtered phonesForShowing
    const lastPhoneOnCurrentPage = (this.state.page * this.state.phonesPerPage) - 1;

    return (
      <div>

        <Pagination
          page={page}
          arrOfPages={arrOfPages}
          pages={pages}
        />

        <label htmlFor="chooseQuantityOfPhonesPerPage">
          <select
            onChange={this.chooseQuantityOfPhonesPerPage}
            id="chooseQuantityOfPhonesPerPage"
          >
            <option value='3'>Per Page: 3</option>
            <option value='5'>Per Page: 5</option>
            <option value='10'>Per Page: 10</option>
            <option value='20'>Per Page: 20</option>
          </select>
        </label>

        <label
          htmlFor="search_field"
        >
          Search:
          <input
            onChange={this.filterHandleInput}
            id="search_field"
            type="text"
          />
        </label>

        <label
          htmlFor="sort_select"
        >
          Sort by:
          <select
            onChange={this.sortFunc}
          >
            <option selected value="age">Newest</option>
            <option value="name">Alphabetical</option>
          </select>
        </label>

        <ul
          className="ulForCards" // временный
        >
          {
            phonesForShowing
              .filter((phone, index) => index >= firstPhoneOnCurrentPage
                && index <= lastPhoneOnCurrentPage)
              .map(phone => (
                <li
                  key={phone.id}
                  className="card" // временный
                >
                  <img
                    className="card__img" // временный
                    src={`${BASE_URL}/${phone.imageUrl}`}
                    alt="altImg"
                  />

                  <Link
                    to={`/phones/${phone.id}`}
                  >
                    {phone.name}
                  </Link>

                  <section>
                    {phone.snippet}
                  </section>

                  <button
                    onClick={() => this.props.addItemToBasket(phone)}
                  >
                    Add to cart
                  </button>
                </li>
              ))
          }
        </ul>
      </div>
    );
  }
}

export default PageOfPhones;
