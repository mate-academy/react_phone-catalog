import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from './Loader';
import { getPhones } from './sources';

const PhonesPage = (props) => {
  const [phones, setPhones] = useState([]);
  useEffect(() => {
    (async () => {
      const phonesFromServer = await getPhones();
      setPhones(phonesFromServer);
    })();
  }, []);

  console.log(phones);
  return (
    <>
      <ul className="catalog-container">
        {phones.map(phone => (
          <li className="catalog-item">
            <Link
              to={`${props.match.path}/${phone.id}`}
              className="link card-link"
            >
              <img src={phone.imageUrl}
                className="product-image"
                alt={phone.id}
              />
              <p className="title">
                {phone.name}
              </p>
              <p className="overview">
                {phone.snippet}
              </p>

            </Link>
            <button className="buy-button" type="button">
              ADD TO CART
            </button>

          </li>
        ))}
      </ul>
    </>
  )
}

export default PhonesPage;
