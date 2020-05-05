import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Phones } from './Phones';
import { getPhonesThunkCreator } from '../../redux/reducers/phonesReducer';
import { PhonesCatalog } from './PhonesCatalog';
import { Preloader } from '../Common/Preloader/Preloader';
import { Filter } from './Filter/Filter';
import { phonesPropType } from '../../propTypesConstants';
import {
  addToCartAC, addToFavoritesAC,
} from '../../redux/reducers/actionCreators';

class PhonesContainer extends React.Component {
  state = {
    query: '',
    select: 'default',
  }

  componentDidMount() {
    this.props.getPhonesThunk();
  }

  handleInput = (event) => {
    const { value } = event.target;

    this.setState({
      query: value.toLowerCase(),
    });
  }

  handleSelect = (event) => {
    const { value } = event.target;

    this.setState({
      select: value,
    });
  }

  getFilteredPhones = (phones, input) => {
    return phones
      .filter(phone => phone.name.toLowerCase().includes(input)
      || phone.snippet.toLowerCase().includes(input));
  }

  getSortedPhones = (phones, select) => {
    switch (select) {
      case 'name':
        return phones.sort((a, b) => a.name.localeCompare(b.name));
      case 'age':
        return phones.sort((a, b) => b.age - a.age);
      default:
        return phones;
    }
  }

  render() {
    const { query, select } = this.state;
    const { phones, addToCart, addToFavorites, itemPrice } = this.props;

    const filteredPhones = this.getFilteredPhones(phones, query);
    const sortedPhones = this.getSortedPhones(filteredPhones, select);

    return (
      <>
        <Phones phones={sortedPhones} />
        <Filter
          handleInput={this.handleInput}
          handleSelect={this.handleSelect}
          query={query}
          select={select}
        />
        {this.props.isFetching ? <Preloader /> : null}
        <PhonesCatalog
          phones={sortedPhones}
          addToCart={addToCart}
          addToFavorites={addToFavorites}
          itemPrice={itemPrice}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  phones: state.phonesPage.phones,
  isFetching: state.phonesPage.isFetching,
  itemPrice: state.phonesPage.itemPrice,
});

const mapDispatchToProps = (dispatch) => ({
  getPhonesThunk: () => dispatch(getPhonesThunkCreator()),
  addToCart: (id) => dispatch(addToCartAC(id)),
  addToFavorites: (id) => dispatch(addToFavoritesAC(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonesContainer);

PhonesContainer.propTypes = {
  getPhonesThunk: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  phones: phonesPropType.isRequired,
  addToCart: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  itemPrice: PropTypes.number.isRequired,
};
