import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPhones, RootState, loadPhones } from '../store';

import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import ProductCard from './ProductCard';

import { Phones } from '../interfaces/interfaces';

type Props = {
  phonesLoad: () => void;
  allPhones: Phones[];
};

class PhonesPage extends Component<Props> {
  componentDidMount() {
    this.props.phonesLoad();
  }

  render() {
    return (
      <div className="phones">
        <Breadcrumbs title="Phones" />
        <Title title="Mobile phones" />
        <p className="phones__quantity">
          {this.props.allPhones.length}
          &nbsp;models
        </p>
        <div className="phones__grid">
          {this.props.allPhones
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(phone => (
              <div key={phone.id}>
                <ProductCard phone={phone} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapState = (state: RootState) => ({
  allPhones: getAllPhones(state),
});

const mapDispatch = {
  phonesLoad: loadPhones,
};

export default connect(mapState, mapDispatch)(PhonesPage);
