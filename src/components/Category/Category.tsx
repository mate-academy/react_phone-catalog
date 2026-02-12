import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import './Category.scss';

export const Category: FC = () => {
  const allProducts = useProductContext().products;

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
      <h2 className="shopByCategory__title">Shop by category</h2>

      <div className="shopByCategory__content">
        <Link to="/phones" className="shopByCategory__link">
          <section className="shopByCategory__block shopByCategory__block--phones">
            <div className="shopByCategory__block-image">
              <img src="img/category-phones.webp" alt="Category Phones" />
            </div>
            <h4 className="shopByCategory__block-title">Mobile phones</h4>
            <span className="shopByCategory__block-description">{`${phonesLength} models`}</span>
          </section>
        </Link>

        <Link to="/tablets" className="shopByCategory__link">
          <section className="shopByCategory__block shopByCategory__block--tablets">
            <div className="shopByCategory__block-image ">
              <img src="img/category-tablets.webp" alt="Category Tablets" />
            </div>
            <h4 className="shopByCategory__block-title">Tablets</h4>
            <span className="shopByCategory__block-description">{`${tabletsLength} models`}</span>
          </section>
        </Link>

        <Link to="/accessories" className="shopByCategory__link">
          <section className="shopByCategory__block shopByCategory__block--accessories">
            <div className="shopByCategory__block-image">
              <img src="img/category-accessories.webp" alt="Category Accessories" />
            </div>
            <h4 className="shopByCategory__block-title">Accessories</h4>
            <span className="shopByCategory__block-description">
              {`${accessoriesLength} models`}
            </span>
          </section>
        </Link>
      </div>
    </div>
  );
};

export default Category;
