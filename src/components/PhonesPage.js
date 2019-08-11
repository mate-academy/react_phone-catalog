import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import getData from '../api/getData';
import PhoneCatalog from './PhoneCatalog';
import Filters from './Filters';
import Pagination from './Pagination';
import SelectPhonesAmmount from './SelectPhonesAmmount';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    isLoaded: false,
    filterValue: '',
    currentPage: 1,
    phonesPerPage: 5,
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

  changeCurrentPage = (currentPage) => {
    this.setState({ currentPage });
  }

  changePerPageAmmount = (event) => {
    const { value } = event.target;
    const { location, history } = this.props;
    const search = new URLSearchParams(location.search);

    this.setState({
      phonesPerPage: +value,
      currentPage: 1,
    });

    search.append('perPage', value);

    history.replace({
      pathname: '/phones/1',
      search: `? ${search.toString()}`,
    });
  }

  render() {
    const {
      isLoaded,
      filterValue,
      currentPage,
      phonesPerPage,
    } = this.state;

    const {
      addPhone,
      selectedPhones,
      increaseQuantity,
      decreaseQuantity,
    } = this.props;

    const visiblePhones = this.filterPhones(filterValue);
    const firstIndex = currentPage * phonesPerPage - phonesPerPage;
    const lastIndex = currentPage * phonesPerPage;

    return (
      <div>
        {isLoaded
          ? (
            <main className="page-content">
              <Filters
                filterValue={filterValue}
                handleFilter={this.handleFilter}
                getSortedPhones={this.getSortedPhones}
              />

              <div className="page-content__catalog">
                <div className="pagination-and-selector">
                  <Pagination
                    phonesPerPage={phonesPerPage}
                    totalPhones={visiblePhones.length}
                    changeCurrentPage={this.changeCurrentPage}
                  />

                  <SelectPhonesAmmount
                    changePerPageAmmount={this.changePerPageAmmount}
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
            <Loader
              type="ThreeDots"
              color="#049dfcde"
            />
          )
        }
      </div>
    );
  }
}

PhonesPage.propTypes = {
  addPhone: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(PhonesPage);
