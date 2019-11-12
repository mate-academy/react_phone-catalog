import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './phone.css';
import { BASE_NAME } from '../../params';

const Phone = ({ phone, AddPhoneToBasketList }) => {
  return (
    <div className="phone">
      <div className="flexBox">
        <img src={`${BASE_NAME}/${phone.imageUrl}`} alt={phone.name} className="phone__img" />
        <div className="phone__content">
          <h4 className="phone__header">
            <Link to={`/phones/${phone.id}`}>
              {phone.name}
            </Link>
          </h4>
          <p>{phone.snippet}</p>
        </div>
      </div>
      <div className="buttonAdd">
        <Button onClick={AddPhoneToBasketList.bind(null, phone)}>Add to basket</Button>
      </div>
    </div>
  );
};

export default Phone;
