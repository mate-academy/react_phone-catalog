/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPhones } from '../api/getPhones';

export default class Cart extends Component {
  state = {
    addedPhones: [],
    matchId: this.props.match.params.id,
  }

  async componentWillMount() {
    const { matchId } = this.state;

    const cartData = await getPhones();
    const cartItem = this.createCartItem();
    const filteredCart = cartData
      .filter(phone => phone.id === matchId)
      .map(phone => (phone = {
        ...phone,
        ...cartItem,
      }));

    this.setState(state => ({
      addedPhones: [...state.addedPhones, ...filteredCart],
    }));

    this.saveToLocalStorage(this.state.addedPhones);

    const storage = this.getFromLocalStorage();

    this.setState({ addedPhones: storage });
  }

  createCartItem = () => ({
    phoneQuantity: 0, // HERE WILL BE COUNTER
    phoneExtraLink: `/phones/${this.props.match.params.id}`,
  })

  getFromLocalStorage = () => JSON.parse(localStorage.getItem('addedPhones'));

  saveToLocalStorage = phones => localStorage
    .setItem('addedPhones', JSON.stringify(phones));

  render() {
    return (
      <div className="order-container">
        <h3>Your order:</h3>
        <div className="order-content">
          <ul className="order-list">
            {this.state.addedPhones.map(phone => (
              <li key={phone.id}>
                <section>
                  <table className="cart-item">
                    <td>
                      <tr>Phone:</tr>
                      <tr>Quantity:</tr>
                      <tr>Link:</tr>
                    </td>

                    <td>
                      <tr>{phone.name}</tr>
                      <tr>{phone.phoneQuantity}</tr>
                      <tr>
                        <Link to={phone.phoneExtraLink}>
                          see phone details again
                        </Link>
                      </tr>
                    </td>
                  </table>
                </section>
              </li>
            ))}
          </ul>
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

Cart.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

Cart.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};
