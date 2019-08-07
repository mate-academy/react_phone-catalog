import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPhones } from '../API_DATA';

import PhoneDetailsPage from './PhoneDetailsPage';
import PhoneCatalog from './PhoneCatalog';

class PhonesPage extends React.Component {
  state={
    phones: [],
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const temp = await getPhones();

    this.setState({
      phones: temp,
      isLoading: false,
    });
  }

  render() {
    const { chandgeBasketItems, basketPhones } = this.props;
    const { isLoading, phones } = this.state;
    const loaderUrl = 'https://i.gifer.com/MbHR.gif';

    const { phoneId } = this.props.match.params;
    const phone = phones.find(currPhone => currPhone.id === phoneId);

    return (
      <div>
        <Switch>
          <Route
            path={`/phones/${phoneId}`}
            component={() => (
              <PhoneDetailsPage phone={phone} phoneId={phoneId} />
            )}
          />

          <Route
            path="/phones/"
            component={() => (
              <div>
                <h1>
                  Phones number:
                  {this.state.phones.length}
                </h1>

                {isLoading && <img src={loaderUrl} alt="loader" />}

                <PhoneCatalog
                  phones={phones}
                  chandgeBasketItems={chandgeBasketItems}
                  basketPhones={basketPhones}
                />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

PhonesPage.propTypes = {
  chandgeBasketItems: PropTypes.func.isRequired,
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default PhonesPage;
