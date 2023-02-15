import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import './ShopByCategory.scss';

export const ShopByCategory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
      } catch {
        setError('We can not load products.');
      }
    };

    loadData();
  }, []);

  if (error) {
    return null;
  }

  return (
    <div data-cy="categoryLinksContainer" className="shopByCategory">
      <h3 className="shopByCategory__title">Shop by category</h3>

      <div className="shopByCategory__items">
        <div className="shopByCategory__mobiles">
          <Link to="/phones">
            <img
              src="../../img/mobiles.png"
              alt="mobiles"
              className="shopByCategory__image shopByCategory__image--mobiles"
            />
          </Link>

          <Link to="/phones" className="shopByCategory__link">
            <h5 className="shopByCategory__subTitle">Mobile phones</h5>
          </Link>

          <p className="shopByCategory__itemAmount">
            {`${products.filter(item => item.type === 'phone').length} models`}
          </p>
        </div>

        <div className="shopByCategory__tablets">
          <Link to="/tablets">
            <img
              src="../../img/tablets.png"
              alt="tablets"
              className="shopByCategory__image shopByCategory__image--tablets"
            />
          </Link>

          <Link to="/tablets" className="shopByCategory__link">
            <h5 className="shopByCategory__subTitle">Tablets</h5>
          </Link>

          <p className="shopByCategory__itemAmount">
            {`${products.filter(item => item.type === 'tablet').length} models`}
          </p>
        </div>

        <div className="shopByCategory__accessories">
          <Link to="/accessories">
            <img
              src="../../img/accessories.png"
              alt="accessories"
              className="shopByCategory__image
                shopByCategory__image--accessories"
            />
          </Link>

          <Link to="/accessories" className="shopByCategory__link">
            <h5 className="shopByCategory__subTitle">Accessories</h5>
          </Link>

          <p className="shopByCategory__itemAmount">
            {`${products.filter(item => item.type === 'accessories').length} models`}
          </p>
        </div>
      </div>
    </div>
  );
};
