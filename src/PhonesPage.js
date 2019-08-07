import React from 'react';
import propTypes from 'prop-types';
import { getPhones } from './GetData';
import Filter from './Filter';
import PhoneCatalog from './PhoneCatalog';
import './styles/phones.css';

class PhonesPage extends React.Component {
  state = {
    phones: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = async() => {
    const phones = await getPhones();

    this.setState({
      phones,
    });
  };

  render() {
    return (
      <div className="phones">
        <Filter />
        <PhoneCatalog
          phones={this.state.phones}
          phoneId={this.props.match.params.id}
        />
      </div>
    );
  }
}

PhonesPage.propTypes = {
  match: propTypes.shape().isRequired,
};

export default PhonesPage;
