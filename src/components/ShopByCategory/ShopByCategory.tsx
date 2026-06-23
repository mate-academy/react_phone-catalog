import './ShopByCategory.scss';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export const ShopByCategory: React.FC = () => {
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
              <img
                // src="./img/category-phones.webp"
                src="https://localhost:4000/img/category-phones.webp"
                crossOrigin="anonimous"
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
                // src="./img/category-tablets.webp"
                src="https://localhost:4000/img/category-tablets.webp"
                crossOrigin="anonimous"
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
                // src="./img/category-accessories.webp"
                src="https://localhost:4000/img/category-accessories.webp"
                crossOrigin="anonimous"
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
