import React from 'react';
import { Link } from 'react-router-dom';

import './slyles/phoneArticle.css';

const PhoneArticle = ({ phone, buyNowHandler, inCart, handleSearch, styleType }) => (
  <article key={phone.age} className={`article${styleType}`}>
    <Link className={`articleLinkImg${styleType}`} to={`/phones/phone-${phone.id}`} onClick={() => handleSearch('')}>
        <img
          className={`articleImage${styleType}`}
          src={`https://mate-academy.github.io/phone-catalogue-static/${phone.imageUrl}`}
          att={`Foto of ${phone.name}`}
        />
    </Link>

    <div className={`articleText${styleType}`}>
      <div className={`articleHeader${styleType}`}>
        <Link className={`articleLink${styleType}`} to={`/phones/phone-${phone.id}`} onClick={() => handleSearch('')}>
          <p>{phone.name}</p>
        </Link>

        {inCart.includes(phone.id)
          ? <div className={`buyNowBTN${styleType} more${styleType}`} onClick={() => buyNowHandler(phone)}>Buy More</div>
          : <div className={`buyNowBTN${styleType}`} onClick={() => buyNowHandler(phone)}>Buy Now</div>
        }

      </div>

      <div>
        {phone.snippet}
      </div>
    </div>
  </article>
);

export default PhoneArticle;
