import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import PhonesPage from './PhonesPage';

class PhoneCatalog extends React.Component {
  state = {
    phoneArrays: [],
  }

  render() {
    const { phoneId, urlImg, phones } = this.props;
    const { phoneArrays } = this.state;

    return (
      <div>
        <input
          type="text"
          className="input"
          placeholder="search"
          onChange={this.handleFindInform}
        />
        {phoneArrays}

        {phones.length === 0 && phoneId === null
          ? <Loading />
          : (
            phones.map(phone => (
              <PhonesPage
                key={phone.id}
                phone={phone}
                phoneId={phoneId}
                urlImg={urlImg}
              />
            )))}
      </div>
    );
  }
}

PhoneCatalog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  phones: PropTypes.array.isRequired,
  phoneId: PropTypes.string.isRequired,
  urlImg: PropTypes.string.isRequired,
};

export default PhoneCatalog;
