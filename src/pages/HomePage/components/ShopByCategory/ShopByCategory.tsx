import './ShopByCategory.scss';
import { FC, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../../../context/GlobalContext';

export const ShopByCategory: FC = () => {
  const { allProducts } = useContext(GlobalContext);

  const { phonesLength, tabletsLength, accessoriesLength } = useMemo(() => {
    const phones = [];
    const tablets = [];
    const accessories = [];

    allProducts.forEach(product => {
      if (product.category === 'phones') {
        phones.push(product.id);
      }

      if (product.category === 'tablets') {
        tablets.push(product.id);
      }

      if (product.category === 'accessories') {
        accessories.push(product.id);
      }
    });

    return {
      phonesLength: phones.length,
      tabletsLength: tablets.length,
      accessoriesLength: accessories.length,
    };
  }, [allProducts]);

  return (
    <div className="shopByCategory">
      <div className="shopByCategory__container">
        <h2 className="shopByCategory__title">Shop by category</h2>

        <div className="shopByCategory__content">
          <Link to="/phones" className="shopByCategory__link">
            <section className="shopByCategory__block">
              <div className="shopByCategory__block-image">
                <img src="img/Category for phones.png" alt="Category Phones" />
              </div>
              <h4 className="shopByCategory__block-title">Mobile phones</h4>
              <span className="shopByCategory__block-description">
                {`${phonesLength} models`}
              </span>
            </section>
          </Link>

          <Link to="/tablets" className="shopByCategory__link">
            <section className="shopByCategory__block">
              <div className="shopByCategory__block-image">
                <img
                  src="img/Category for tablets.png"
                  alt="Category Tablets"
                />
              </div>
              <h4 className="shopByCategory__block-title">Tablets</h4>
              <span className="shopByCategory__block-description">
                {`${tabletsLength} models`}
              </span>
            </section>
          </Link>

          <Link to="/accessories" className="shopByCategory__link">
            <section className="shopByCategory__block">
              <div className="shopByCategory__block-image">
                <img
                  src="img/Category for accessories.png"
                  alt="Category Accessories"
                />
              </div>
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
