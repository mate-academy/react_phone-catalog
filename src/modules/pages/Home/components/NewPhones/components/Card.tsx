// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Access, Phone } from '../../../../types/types';
import './Card.scss';

type Props = {
  phone: Phone | Access;
};

export const Card: React.FC<Props> = ({ phone }) => {
  // const [addedPhones, setAddedPhones] = useState<Phone[]>([]);

  // function AddPhone(currentPhone: Phone) {
  //   setAddedPhones([...addedPhones, currentPhone]);
  // }

  const phoneId = phone.id;

  return (
    <div className="card">
      <div className="card-container">
        <Link to={phoneId} className="picture-block">
          <img
            className="picture"
            src={phone.images[0]}
            alt="Phone picture"
          ></img>
        </Link>
        <h1 className="card-name">{phone.name}</h1>
        <h2 className="price-block">
          <p className="current-price">${phone.priceRegular}</p>
          <p className="full-price">${phone.priceDiscount}</p>
        </h2>
        <div className="desc-block">
          <div className="desc-line">
            <p className="left-text">Screen</p>
            <p className="right-text">{phone.screen}</p>
          </div>
          <div className="desc-line">
            <p className="left-text">Capacity</p>
            <p className="right-text">{phone.capacity}</p>
          </div>
          <div className="desc-line">
            <p className="left-text">RAM</p>
            <p className="right-text">{phone.ram}</p>
          </div>
        </div>
        <div className="buttons">
          <button className="Add-btn">Add to card</button>
          <button className="fav-btn">
            <img src="./uploadedImg/like-btn.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};
