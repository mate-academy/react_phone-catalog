import React from 'react';

class Cart extends React.Component {
  state = {
    orderedPhone: [],
    quantity: 1,
  }

  render() {
    const {orderedPhone, quantity} = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <h1>Your cart is empty</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
