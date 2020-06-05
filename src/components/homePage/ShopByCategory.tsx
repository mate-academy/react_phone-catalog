import React from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';

type Props = {
  preparedPhones: Item[];
};

const ShopByCategory: React.FC<Props> = ({ preparedPhones }) => {
  const countPhones = preparedPhones.filter((phone: Item) => phone.type === 'phone').length;
  const countTablets = preparedPhones.filter((phone: Item) => phone.type === 'tablet').length;
  const countAccessories = preparedPhones.filter((phone: Item) => phone.type === 'accessories').length;

  return (
    <section className="shop-by-category">
      <h2 className="shop-by-category__article">Shop by category</h2>
      <div className="shop-by-category__cards">
        <Link to="/phones" className="shop-by-category__card shop-by-category__card-mobile">
          <div className="shop-by-category__card-image-wrapper">
            <img className="shop-by-category__card-image" src="./img/shopBycategoryPicture/1.jpg" alt="kjhg" />
          </div>
          <h3 className="shop-by-category__card-article">Mobile phones</h3>
          <p className="shop-by-category__card-quantity">
            {countPhones}
            {' '}
            models
          </p>
        </Link>
        <Link to="/tablets" className="shop-by-category__card shop-by-category__card-mobile">
          <div className="shop-by-category__card-image-wrapper">
            <img className="shop-by-category__card-image" src="./img/shopBycategoryPicture/2.jpg" alt="kjhg" />
          </div>
          <h3 className="shop-by-category__card-article">Tablets</h3>
          <p className="shop-by-category__card-quantity">
            {countTablets}
            {' '}
            models
          </p>
        </Link>
        <Link to="/accessories" className="shop-by-category__card shop-by-category__card-mobile">
          <div className="shop-by-category__card-image-wrapper">
            <img className="shop-by-category__card-image" src="./img/shopBycategoryPicture/3.jpg" alt="kjhg" />
          </div>
          <h3 className="shop-by-category__card-article">Accessories</h3>
          <p className="shop-by-category__card-quantity">
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
