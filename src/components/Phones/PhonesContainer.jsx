import React from 'react';
import { connect } from 'react-redux';
import { Phones } from './Phones';
import { setPhonesActionCreators } from '../../redux/reducers/phonesReducer';
import { getPhones } from '../../redux/api/api';

class PhonesContainer extends React.Component {
  componentDidMount() {
    getPhones()
      .then(data => this.props.setPhones(data));
  }

  render() {
    return (
      <Phones phones={this.props.phones} />
    );
  }
}

const mapStateToProps = (state) => ({
  phones: state.phonesPage.phones,
});

const mapDispatchToProps = (dispatch) => ({
  setPhones: (phones) => dispatch(setPhonesActionCreators(phones)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonesContainer);
