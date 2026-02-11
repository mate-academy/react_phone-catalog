import './ShopByCategory.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../../store/GlobalContext';

export const ShopByCategory: React.FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const phonesLength = allProducts.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsLength = allProducts.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesLength = allProducts.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <div className="shopByCategory">
      <div className="shopByCategory__container">
        <h2 className="shopByCategory__title">Shop by category</h2>

        <div className="shopByCategory__content">
          <Link to="/phones" className="shopByCategory__link">
            <section className="shopByCategory__block">
              <img
                src="img/Category for phones.png"
                alt="Category Phones"
                className="shopByCategory__block-image"
              />
              <h4 className="shopByCategory__block-title">Mobile phones</h4>
              <span className="shopByCategory__block-description">
                {`${phonesLength} models`}
              </span>
            </section>
          </Link>

          <Link to="/tablets" className="shopByCategory__link">
            <section className="shopByCategory__block">
              <img
                src="img/Category for tablets.png"
                alt="Category Tablets"
                className="shopByCategory__block-image"
              />
              <h4 className="shopByCategory__block-title">Tablets</h4>
              <span className="shopByCategory__block-description">
                {`${tabletsLength} models`}
              </span>
            </section>
          </Link>

          <Link to="/accessories" className="shopByCategory__link">
            <section className="shopByCategory__block">
              <img
                src="img/Category for accessories.png"
                alt="Category Accessories"
                className="shopByCategory__block-image"
              />
              <h4 className="shopByCategory__block-title">Accessories</h4>
              <span className="shopByCategory__block-description">
                {`${accessoriesLength} models`}
              </span>
            </section>
          </Link>
        </div>
      </div>
    </div>
  );
};
