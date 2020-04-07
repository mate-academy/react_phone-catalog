import React from 'react';
import { connect } from 'react-redux';
import { Phones } from './Phones';
import { setPhonesActionCreators } from '../../redux/reducers/phonesReducer';

export class PhonesContainer extends React.Component {
  componentDidMount() {
    alert('everithing is fine');
  }

  render() {
    return (
      <Phones />
    );
  }
}

const mapStateToProps = (state) => ({
  phones: state.phonesPage.phones,
});

const mapDispatchToProps = (dispatch) => ({
  setPhones: (phones) => dispatch(setPhonesActionCreators(phones)),
});

connect(mapStateToProps, mapDispatchToProps)(Phones);
