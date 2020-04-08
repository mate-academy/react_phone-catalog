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
      <>
        <Phones
          phones={this.props.phones}
          isFetching={this.props.isFetching}
        />
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
