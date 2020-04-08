import React from 'react';
import { connect } from 'react-redux';
import { Phones } from './Phones';
import { getPhonesThunkCreator } from '../../redux/reducers/phonesReducer';

class PhonesContainer extends React.Component {
  componentDidMount() {
    this.props.getPhonesThunk();
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
  getPhonesThunk: () => dispatch(getPhonesThunkCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonesContainer);
