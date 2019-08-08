import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import { getExtraDetails } from '../api/getPhones';
import PhoneDetailsItem from './PhoneDetailsItem';

class PhoneDetails extends Component {
  state = {
    extraData: {},
    selectedPhoto: '',
  };

  async componentDidMount() {
    const { id } = this.props;
    const extraData = await getExtraDetails(id);

    this.setState({
      extraData,
      selectedPhoto: extraData.images[0],
    });
  }

  handleChoosePhoto = (event) => {
    const { name } = event.target;

    this.setState({ selectedPhoto: name });
  };

  render() {
    const { extraData, selectedPhoto } = this.state;
    const { id } = this.props;

    return (
      <>
        <div>
          {id === extraData.id ? (
            <>
              <Link to="/phones">
                <button className="btn btn-back" type="button">
                  {'<<- Back to all phones'}
                </button>
              </Link>
              <Link to="/cart/">
                <button
                  onClick={this.props.handleAddToCart}
                  id={extraData.id}
                  className="btn btn-buy"
                  type="button"
                >
                  {'->> BUY NOW  <<-'}
                </button>
              </Link>
              <PhoneDetailsItem
                extraData={extraData}
                selectedPhoto={selectedPhoto}
                handleChoosePhoto={this.handleChoosePhoto}
                handleAddToCart={this.props.handleAddToCart}
              />
            </>
          ) : (
            <>
              <Loader />
              <p>
                {'Maybe this page is not available, '}
                <Link to="/phones">go back</Link>
                {' and try checking late'}
              </p>
            </>
          )}
        </div>
      </>
    );
  }
}

PhoneDetails.propTypes = {
  id: PropTypes.string.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default PhoneDetails;
