import React, { Component } from 'react';

export default class Cart extends Component {
  state = {}

  render() {
    return (
      <div className="order-container">
        <h3>Your order:</h3>
        <div className="order-content">
          1
          <br />
          2
          <br />
          3
          <br />
          4
          <p>Total:______</p>
        </div>
        <div className="order-btn-block">
          <button type="button" className="btn btn-buy">
            {'->> BUY NOW  <<-'}
          </button>
        </div>
      </div>
    );
  }
}
