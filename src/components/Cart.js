import React, { Component } from 'react';

export default class Cart extends Component {
  state = {}

  render() {
    return (
      <div>
        <h3>Shopping CART</h3>
        <div>
          <p>Ваш заказ: </p>
        </div>
        <button className="btn btn-buy">BUY NOW!</button>
      </div>
    );
  }

}
