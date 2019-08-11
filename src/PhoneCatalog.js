import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import PhonesPage from './PhonesPage';

class PhoneCatalog extends React.Component {
  state = {
    phoneArrays: [],
  }

  render() {
    const {
      phoneId, urlImg, phones, handleFilter,
    } = this.props;
    const { phoneArrays } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            className="input"
            placeholder="search"
            onChange={handleFilter}
          />
        </form>

        {phoneArrays}

        {phones.length === 0 && phoneId === 0
          ? <Loading />
          : (
            phones.map(phone => (
              <PhonesPage
                key={phone.id}
                phone={phone}
                phoneId={phoneId}
                urlImg={urlImg}
              />
            )))
        }
      </div>
    );
  }
}

PhoneCatalog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  phones: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  phoneId: PropTypes.string,
  urlImg: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default PhoneCatalog;
