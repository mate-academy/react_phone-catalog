import React from 'react';

import './styles/details.css';

const PhoneDetails = ({ phone, handleClick }) => (
  <div className="Details_List">
    <div className="phone-details">
      <button
        onClick={() => handleClick(phone)}
        className="add-to-basket_button-details"
      >
        Add to Basket
      </button>
      <div className="phone-details_description">
        <ul className="Details_Li-ul">
           <b>Description: </b>
          <li>
            {phone.description}
          </li>
        </ul>
      </div>
      <div className="phone-details">
        <div className="phone-details_item">
          <ul className="Details_Li-ul">
            <b>Display:</b>
            {Object.entries(phone.display).map(data =>(
              <li key={Math.random()}>{data.join(': ').split()}</li>
            ))}
          </ul>
        </div>

        <div className="phone-details_item">
          <ul className="Details_Li-ul">
            <b>Android:</b>
            {Object.entries(phone.android).map(data =>(
              <li key={Math.random()}>{data.join(': ').split()}</li>
            ))}
          </ul>
        </div>

        <div className="phone-details_item">
          <ul className="Details_Li-ul">
            <b>Battery:</b>
            {Object.entries(phone.battery).map(data =>(
              <li key={Math.random()}>{data.join(': ').split()}</li>
            ))}
          </ul>
        </div>

        <div className="phone-details_item">
          <ul className="Details_Li-ul">
            <b>Connectivity:</b>
            {Object.entries(phone.connectivity).map(data =>(
              <li key={Math.random()}>{data.join(': ').split()}</li>
            ))}
          </ul>
        </div>

        <div className="phone-details_item">
          <ul className="Details_Li-ul">
            <b>Hardware:</b>
            {Object.entries(phone.hardware).map(data =>(
              <li key={Math.random()}>{data.join(': ').split()}</li>
            ))}
          </ul>
        </div>

        <div className="phone-details_item">
          <ul className="Details_Li-ul">
            <b>Storage:</b>
            {Object.entries(phone.storage).map(data =>(
              <li key={Math.random()}>{data.join(': ').split()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>)

export default PhoneDetails;
