import React from 'react';
import { Link } from 'react-router-dom';

import './styles/basket.css';

const imageFromUrl = 'https://mate-academy.github.io/phone-catalogue-static';

class Basket extends React.Component {
  state = {
    addeSelectedPhones: [],
  }
  render() {
    const {selectedPhones, handleItemDelete} = this.props;
    return(
      <div className="basket_phones_list">
        <h6 >Basket with {selectedPhones.length} item</h6>
        {selectedPhones.map(phone => (
          <div key={Math.random()}
            className="basket_phones_item"
          >
            <div>
            <Link
              to={`/phones/${phone.id}`}
              className="phone_names"
            >
              <img
                src={`${imageFromUrl}/${phone.imageUrl}`}
                className="img_preview_basket"
                alt={`${phone.name}`}
              />
              </Link>
            </div>
            <div>
              <Link
               to={`/phones/${phone.id}`}
               className="phone_names"
             >
                <p className="phone_names">{phone.id}</p>
              </Link>
              <p> {phone.snippet}</p>
            </div>
            <div>
              <button onClick={() => handleItemDelete(phone.id)} className="delete-button">Delete</button>
            </div>
        </div>
        ))}
      </div>
    )
  };
}


export default Basket;
