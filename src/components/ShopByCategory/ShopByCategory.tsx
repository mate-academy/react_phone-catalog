/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

const phone = require('../../images/shopByCategory/mobile-phones.jpg');
const tablet = require('../../images/shopByCategory/tablets.jpg');
const accessories = require('../../images/shopByCategory/accessories.jpg');

export const ShopByCategory = () => {
  return (
    <section className="shopByCategory">
      <h2 className="title">Shop by category</h2>

      <div className="shopByCategory__wrapper" data-cy="categoryLinksContainer">
        <Link className="shopByCategory__link" to="/phones">
          <div className="shopByCategory__img-wrapper">
            <img src={phone} alt="Phones" className="shopByCategory__img" />
          </div>

          <h3 className="shopByCategory__title">Mobile phones</h3>

          <span className="shopByCategory__amount">95 models</span>
        </Link>

        <Link className="shopByCategory__link" to="/tablets">
          <div className="shopByCategory__img-wrapper">
            <img src={tablet} alt="Tablets" className="shopByCategory__img" />
          </div>

          <h3 className="shopByCategory__title">Tablets</h3>

          <span className="shopByCategory__amount">0 models</span>
        </Link>

        <Link className="shopByCategory__link" to="/accessories">
          <div className="shopByCategory__img-wrapper">
            <img
              src={accessories}
              alt="Accessories"
              className="shopByCategory__img"
            />
          </div>

          <h3 className="shopByCategory__title">Accessories</h3>

          <span className="shopByCategory__amount">0 models</span>
        </Link>
      </div>
    </section>
  );
};
