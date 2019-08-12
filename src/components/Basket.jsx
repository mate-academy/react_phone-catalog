import React from 'react';
import { Link } from 'react-router-dom';

class Basket extends React.Component {
  state= {}

  render() {
    return (
      <>
        <table>

          <thead>
            <tr>
              <th>Quantity</th>
              <th>Product</th>
              <th>Id</th>
              <th />
            </tr>
          </thead>

          <tbody>

            {this.props.basketItems.map(item => (
              <tr key={item.id}>

                <td>
                  <button
                    onClick={() => this.props.handleDecQuantity(item.id)}
                    type="button"
                  >
                    -
                  </button>

                  {item.quantity}

                  <button
                    onClick={() => this.props.handleIncQuantity(item.id)}
                    type="button"
                  >
                    +
                  </button>
                </td>

                <td>
                  <Link to={`/phones/${item.id}`}>
                    <div>
                      <img
                        className="phone__img"
                        src={item.img}
                        alt="Phone"
                      />
                    </div>
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/phones/${item.id}`}
                    className="phone__description"
                  >
                    {item.id}
                  </Link>
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() => this.props.handleRemovePhone(item.id)}
                  >
                    x
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </>
    );
  }
}

export default Basket;
