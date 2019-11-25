import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { BASE_URL } from '../components/constants';

class PageOfPhones extends React.Component {
  state = {
    phonesForShowing: [],
    // page: 1,
    // perPage: 20,
    // pages: 1,
  }

  componentDidMount = () => {
    // query params in URL + phones for showing
    let params = new URLSearchParams(this.props.location.search);
    if (params.get("filter")) {
      this.setState({
        phonesForShowing: this.props.phones
          .filter(phone => phone.id.toLowerCase().includes(params.get("filter").toLowerCase())),
      })
    } else {
      this.setState({
        phonesForShowing: this.props.phones,
      });
    };
  };

  handleInput = (event) => {
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
        .filter(phone => phone.id.toLowerCase().includes(value.toLowerCase())),
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

  render() {
    const { phonesForShowing } = this.state;
    console.log(phonesForShowing);
    
    return (
      <div>
        <label
          htmlFor="search_field"
        >
          Search:
          <input
            onChange={this.handleInput}
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
            <option value="age">Newest</option>
            <option value="name">Alphabetical</option>
          </select>
        </label>

        <ul>
          {
            phonesForShowing.map(phone => (
              <li key={phone.id}>
                <img
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
