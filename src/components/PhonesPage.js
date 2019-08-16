import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import getData from '../api/getData';
import PhoneCatalog from './PhoneCatalog';
import Filter from './Filter';
import Pagination from './Pagination';
import SelectPhonesAmount from './SelectPhonesAmount';
import getSortedPhones from './getSortedPhones';
import Sorter from './Sorter';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    isLoaded: false,
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
    const { location, history } = this.props;
    const params = new URLSearchParams(location.search);

    value === ''
      ? params.delete('querry')
      : params.set('querry', value);

    params.set('page', 1);

    history.push({
      pathname: '/phones',
      search: `?${params.toString()}`,
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

  handleSort = (value) => {
    const { location, history } = this.props;
    const params = new URLSearchParams(location.search);

    params.set('sort', value);

    history.push({
      pathname: '/phones',
      search: `?${params.toString()}`,
    });
  }

  changeCurrentPage = (event) => {
    const { value } = event.target;
    const { location, history } = this.props;
    const params = new URLSearchParams(location.search);

    params.set('page', value);

    history.push({
      pathname: '/phones',
      search: `?${params.toString()}`,
    });
  }

  changePerPageAmount = (event) => {
    const { value } = event.target;
    const { location, history } = this.props;
    const params = new URLSearchParams(location.search);

    params.set('perPage', value);
    params.set('page', 1);

    history.push({
      pathname: '/phones',
      search: `?${params.toString()}`,
    });
  }

  render() {
    const {
      isLoaded,
    } = this.state;

    const {
      addPhone,
      selectedPhones,
      increaseQuantity,
      decreaseQuantity,
      location,
    } = this.props;

    const params = new URLSearchParams(location.search);

    const phonesPerPage = params.get('perPage');
    const currentPage = params.get('page');
    const filterValue = params.get('querry') ? params.get('querry') : '';
    const sortField = params.get('sort');
    const filteredPhones = this.filterPhones(filterValue);
    const visiblePhones = getSortedPhones(filteredPhones, sortField);
    const firstIndex = currentPage * phonesPerPage - phonesPerPage;
    const lastIndex = currentPage * phonesPerPage;

    return (
      <div>
        {isLoaded
          ? (
            <main className="page-content">
              <Filter
                filterValue={filterValue}
                handleFilter={this.handleFilter}
              />

              <div className="page-content__catalog">
                <Sorter
                  getSortedPhones={this.handleSort}
                  sortField={sortField}
                />

                <div className="pagination-and-selector">
                  <Pagination
                    phonesPerPage={phonesPerPage}
                    totalPhones={visiblePhones.length}
                    changeCurrentPage={this.changeCurrentPage}
                  />

                  <SelectPhonesAmount
                    changePerPageAmount={this.changePerPageAmount}
                  />
                </div>

                <PhoneCatalog
                  phones={visiblePhones.slice(firstIndex, lastIndex)}
                  addPhone={addPhone}
                  selectedPhones={selectedPhones}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />

                <Pagination
                  phonesPerPage={phonesPerPage}
                  totalPhones={visiblePhones.length}
                  changeCurrentPage={this.changeCurrentPage}
                />

                <div className="page-content__with-info">
                  {`${firstIndex + 1} - ${lastIndex <= visiblePhones.length
                    ? lastIndex
                    : visiblePhones.length
                  } of ${visiblePhones.length} posts`}
                </div>
              </div>
            </main>
          ) : (
            <div className="loader">
              <Loader
                type="ThreeDots"
                color="#049dfcde"
              />
            </div>
          )
        }
      </div>
    );
  }
}

PhonesPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addPhone: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(PhonesPage);
