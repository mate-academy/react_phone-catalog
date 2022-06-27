import { Link } from 'react-router-dom';
import Phones from '../assets/images/phones.png';
import Tablets from '../assets/images/tablets.png';
import Accessories from '../assets/images/accessories.png';

const ShopByCategory = () => {
  return (
    <section className="ShopByCategory page__section">
      <h2 className="page__section-title">
        Shop by category
      </h2>
      <div className="ShopByCategory__categories">
        <Link
          to="phones"
          className="ShopByCategory__category"
        >
          <div className="ShopByCategory__img-container">
            <img
              src={Phones}
              alt="img-category"
              className="ShopByCategory__img"
            />
          </div>
          <h3 className="ShopByCategory__name">
            Mobile phones
          </h3>
          <h3 className="ShopByCategory__amount">
            Avaliable
          </h3>
        </Link>
        <Link
          to="phones"
          className="ShopByCategory__category"
        >
          <div className="ShopByCategory__img-container">
            <img
              src={Tablets}
              alt="img-category"
              className="ShopByCategory__img"
            />
          </div>
          <h3 className="ShopByCategory__name">
            Tablets
          </h3>
          <h3 className="ShopByCategory__amount">
            Avaliable
          </h3>
        </Link>
        <Link
          to="phones"
          className="ShopByCategory__category"
        >
          <div className="ShopByCategory__img-container">
            <img
              src={Accessories}
              alt="img-category"
              className="ShopByCategory__img"
            />
          </div>
          <h3 className="ShopByCategory__name">
            Accessories
          </h3>
          <h3 className="ShopByCategory__amount">
            Avaliable
          </h3>
        </Link>
      </div>
    </section>
  );
};

export default ShopByCategory;
