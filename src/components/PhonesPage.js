import React from 'react';

import Loader from 'react-loader-spinner';
import getData from '../api/getData';
import PhoneCatalog from './PhoneCatalog';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    isLoaded: false,
    filterValue: '',
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const phones = await getData();

    this.setState({
      phones,
      isLoaded: true,
    });
  }

  handleFilter = (event) => {
    const { value } = event.target;

    this.setState({
      filterValue: value.toLowerCase(),
    });
  }

  filterPhones = (filterValue) => {
    const { phones } = this.state;

    return phones.filter(
      phone => (
        (phone.id + phone.snippet)
          .toLowerCase()
          .includes(filterValue.trim())
      ),
    );
  }

  getSortedPhones = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'age':
        return this.setState(prevState => ({
          phones: [...prevState.phones]
            .sort((a, b) => a.age - b.age),
        }));
      case 'alphabet':
        return this.setState(prevState => ({
          phones: [...prevState.phones]
            .sort((a, b) => a.name.localeCompare(b.name)),
        }));
      default:
        return this.setState(prevState => ({
          phones: prevState.phones,
        }));
    }
  }

  render() {
    const { isLoaded, filterValue } = this.state;
    const visiblePhones = this.filterPhones(filterValue);

    return (
      <div>
        {isLoaded
          ? (
            <main className="page-content">
              <div className="filter">
                <div>
                  <label htmlFor="filter-input">
                    Search:
                    <input
                      type="text"
                      id="filter-input"
                      className="filter__input"
                      value={filterValue}
                      onChange={this.handleFilter}
                    />
                  </label>
                </div>

                <div>
                  <label htmlFor="sort-field">
                    Sort by:
                    <select
                      id="sort-field"
                      name="sort-field"
                      className="filter__selector"
                      onChange={this.getSortedPhones}
                    >
                      <option value="age">
                        Newest
                      </option>

                      <option value="alphabet">
                        Alphabetical
                      </option>
                    </select>
                  </label>
                </div>
              </div>

              <PhoneCatalog phones={visiblePhones} />
            </main>
          ) : (
            <Loader
              type="ThreeDots"
              color="#049dfcde"
              height="100"
              width="100"
            />
          )
        }
      </div>
    );
  }
}

export default PhonesPage;
