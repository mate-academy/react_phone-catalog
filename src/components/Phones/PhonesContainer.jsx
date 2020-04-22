import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Phones } from './Phones';
import { getPhonesThunkCreator } from '../../redux/reducers/phonesReducer';
import { PhonesCatalog } from './PhonesCatalog';
import { Preloader } from '../Common/Preloader/Preloader';
import { Filter } from './Filter/Filter';
import { phonesPropType } from '../../propTypesConstants';

class PhonesContainer extends React.Component {
  state = {
    query: '',
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

  getFilteredPhones = (phones, input) => {
    return phones
      .filter(phone => phone.name.toLowerCase().includes(input)
      || phone.snippet.toLowerCase().includes(input));
  }

  render() {
    const { query } = this.state;
    const { phones } = this.props;

    const filteredPhones = this.getFilteredPhones(phones, query);

    return (
      <>
        <Phones phones={filteredPhones} />
        <Filter
          handleInput={this.handleInput}
          query={this.state.query}
        />
        {this.props.isFetching ? <Preloader /> : null}
        <PhonesCatalog phones={filteredPhones} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  phones: state.phonesPage.phones,
  isFetching: state.phonesPage.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getPhonesThunk: () => dispatch(getPhonesThunkCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonesContainer);

PhonesContainer.propTypes = {
  getPhonesThunk: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  phones: phonesPropType.isRequired,
};
