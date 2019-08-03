import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

export default class Loader extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <div className="sweet-loading">
        <PulseLoader color="#1862498e" loading={this.state.loading} />
      </div>
    );
  }
}
