import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import './slyles/cart.css';

const Cart = ({ cart, handlerCartQttySet, handleCartDeleteItem, searchStr }) => {
  if (searchStr) {
    return (<Redirect to="/phones" />);
  }

  if (!cart[0]) {
    return (
      <div className="cart">
        <h2>Nothing in the Cart for Now</h2>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your current order</h2>
      <table className="cartTable">
        <thead>
          <tr>
            <th>№</th>
            <th />
            <th>Item</th>
            <th>Quantity</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((order, index) => (
            <tr className="cartItem" key={order.id}>
              <td className="cartTableNo">{order.id}</td>

              <td className="cartTablePic">
                <Link to={`/phones/phone-${order.phone.id}`}>
                  <img
                    className="cartPhoneImg"
                    src={`https://mate-academy.github.io/phone-catalogue-static/${order.phone.imageUrl}`}
                    alt={`Foto of ${order.phone.name}`}
                  />
                </Link>
              </td>

              <td className="cartTableItem">
                <Link
                  className="cartItemName"
                  to={`/phones/phone-${order.phone.id}`}
                >
                  <p>{order.phone.name}</p>
                </Link>
              </td>

              <td className="cartTableQtty">
                <input
                  className="cartInputQtty"
                  type="number"
                  value={order.quantity}
                  onChange={event => handlerCartQttySet(index, +event.target.value)}
                />
              </td>

              <td className="cartTableDel">
                <img
                  className="cartDelItemImg"
                  src="https://www.freepngimg.com/thumb/delete_button/25776-7-delete-button-image.png"
                  alt="delete item"
                  onClick={() => handleCartDeleteItem(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
