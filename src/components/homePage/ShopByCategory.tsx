import React from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';

type Props = {
  preparedPhones: Phone[];
};

const ShopByCategory: React.FC<Props> = ({ preparedPhones }) => {
  const countPhones = preparedPhones.filter((phone: Phone) => phone.type === 'phone').length;
  const countTablets = preparedPhones.filter((phone: Phone) => phone.type === 'tablet').length;
  const countAccessories = preparedPhones.filter((phone: Phone) => phone.type === 'accessories').length;

  return (
    <section className="shopByCategory">
      <h2 className="shopByCategory__article">Shop by category</h2>
      <div className="shopByCategory__cards">
        <Link to="/phones" className="shopByCategory__card shopByCategory__card-mobile">
          <div className="shopByCategory__card-image-wrapper">
            <img className="shopByCategory__card-image" src="./img/shopBycategoryPicture/1.jpg" alt="kjhg" />
          </div>
          <h3 className="shopByCategory__card-article">Mobile phones</h3>
          <p className="shopByCategory__card-quantity">
            {countPhones}
            {' '}
            models
          </p>
        </Link>
        <Link to="/tablets" className="shopByCategory__card shopByCategory__card-mobile">
          <div className="shopByCategory__card-image-wrapper">
            <img className="shopByCategory__card-image" src="./img/shopBycategoryPicture/2.jpg" alt="kjhg" />
          </div>
          <h3 className="shopByCategory__card-article">Tablets</h3>
          <p className="shopByCategory__card-quantity">
            {countTablets}
            {' '}
            models
          </p>
        </Link>
        <Link to="/accessories" className="shopByCategory__card shopByCategory__card-mobile">
          <div className="shopByCategory__card-image-wrapper">
            <img className="shopByCategory__card-image" src="./img/shopBycategoryPicture/3.jpg" alt="kjhg" />
          </div>
          <h3 className="shopByCategory__card-article">Accessories</h3>
          <p className="shopByCategory__card-quantity">
            {countAccessories}
            {' '}
            models
          </p>
        </Link>
      </div>
    </section>
  );
};

export default ShopByCategory;
