import React from 'react';
import { Link } from 'react-router-dom';

class Basket extends React.Component {
  state= {}

  render() {
    const {
      basketItems,
      handleDecQuantity,
      handleIncQuantity,
      handleRemovePhone,
      history,
    } = this.props;

    return (
      <>
        <button
          className="goBackButton"
          type="button"
          onClick={() => history.goBack()}
        >
          Go back
        </button>

        {basketItems.length < 1
          && (
            <h1 className="HomePage">Basket is empty</h1>
          )
        }

        {basketItems.length >= 1
          && (
            <table className="busketItems">

              <thead>
                <tr className="busketItems__title">
                  <th>Quantity</th>
                  <th>Product</th>
                  <th>Id</th>
                  <th />
                </tr>
              </thead>

              <tbody>

                {basketItems.map(item => (
                  <tr key={item.id}>

                    <td>
                      <button
                        onClick={() => handleDecQuantity(item.id)}
                        type="button"
                      >
                        -
                      </button>

                      <span
                        className="busketItems__quantity"
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncQuantity(item.id)}
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
                        onClick={() => handleRemovePhone(item.id)}
                      >
                        x
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          )
        }
      </>
    );
  }
}

export default Basket;
