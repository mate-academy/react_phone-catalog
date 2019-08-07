import React from 'react';
import PropTypes from 'prop-types';
import { getPhoneDetails } from '../loadingData';

class PhoneDetailsPage extends React.Component {
  state = {
    phone: [],
    mainImg: '',
  }

  componentDidMount() {
    const { phoneId } = this.props.match.params;

    getPhoneDetails(phoneId).then(
      (data) => {
        this.setState({
          phone: { ...data },
          mainImg: data.images[0],
        });
      }
    );
  }

  render() {
    const { phone, mainImg } = this.state;

    return (
      <div>
        <div>
          <img src={mainImg} alt="" />
        </div>

        <div>
          <h1>
            {phone.name}
          </h1>

          <p>
            {phone.description}
          </p>

          <div>
            {
              (phone.images)
                && phone.images.map(image => (
                  <div>
                    <img src={`./${image}`} alt="" />
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    );
  }
}

PhoneDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      phoneId: PropTypes.string,
    }),
  }).isRequired,
};

export default PhoneDetailsPage;
