/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';

class Basket extends React.Component {
  removeItem = (event) => {
    event.preventDefault();
    this.props.basketRemoveItem(event.target.value)
  };
  
  render() {
    const { basket } = this.props;
    return (
      <div className='Basket'>
        {basket.length === 0
          ? <h1>Basket is empty</h1>
          : basket.map(item => (
            <Link
              key={item.id}
              to={item.phone}>
              <div
                className='Basket__item'
              >
                <img className="Basket__item-image" src={item.image} />
                <div>
                  <h3 className="Basket__item-name">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  value={item.id}
                  onClick={this.removeItem}
                  className="Basket__item-remove-button"
                >
                  x
                </button>
              </div>
            </Link>
          ))}
      </div>
    )
  }
}

export default Basket;
