import React, { Component } from 'react';

import Breadcrumbs from './Breadcrumbs';
import Title from './Title';

class Favs extends Component {
  render() {
    return (
      <div className="favs">
        <Breadcrumbs title="Favorites" />
        <Title title="Favorites" />
      </div>
    );
  }
}

export default Favs;
