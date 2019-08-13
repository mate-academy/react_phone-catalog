/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';

class Basket extends React.Component {
  removeItem = (event) => {
    event.preventDefault();
    this.props.basketRemoveItem(event.target.value)
  };
  
  quantityChange = (event) => {
    event.preventDefault();
    const { value, dataset } = event.target;
    if (dataset.quantity <= 1 && dataset.direction === 'minus') {
      return
    }
    this.props.basketChangeItemQuantity(value, dataset.direction);
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
                <img className='Basket__item-image' src={item.image} />
                <div>
                  <h3 className='Basket__item-name'>{item.name}</h3>
                  <div className='Basket__item-quantity'>
                    Quantity:
                    <button
                      value={item.id}
                      data-direction="plus"
                      onClick={this.quantityChange}
                      className="Basket__item-quantity-plus"
                    />
                     {item.quantity}
                    <button
                      value={item.id}
                      data-quantity={item.quantity}
                      data-direction="minus"
                      onClick={this.quantityChange}
                      className="Basket__item-quantity-minus"
                    />
                  </div>
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
