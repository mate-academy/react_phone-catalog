import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../../services/Products';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accessoriesCount, setAccessoriesCount] = useState(0);

  useEffect(() => {
    const fetchProductCounts = async () => {
      const phones = await getProductsByCategory('phones');
      const tablets = await getProductsByCategory('tablets');
      const accessories = await getProductsByCategory('accessories');

      setPhonesCount(phones.length);
      setTabletsCount(tablets.length);
      setAccessoriesCount(accessories.length);
    };

    fetchProductCounts();
  }, []);

  return (
    <div className="categories">
      <h2 className="title title--h2">Shop by category</h2>

      <div className="categories__block">
        <div className="categories__component">
          <NavLink to="/phones">
            <div className="categories__img categories__img--phone" />
          </NavLink>

          <div className="categories__component__text">
            <h4 className="title title--h4">Mobile phones</h4>
            <p>{phonesCount} models</p>
          </div>
        </div>

        <div className="categories__component">
          <NavLink to="/tablets">
            <div className="categories__img categories__img--tablet" />
          </NavLink>

          <div className="categories__component__text">
            <h4 className="title title--h4">Tablets</h4>
            <p>{tabletsCount} models</p>
          </div>
        </div>

        <div className="categories__component">
          <NavLink to="/accessories">
            <div className="categories__img categories__img--accessory" />
          </NavLink>

          <div className="categories__component__text">
            <h4 className="title title--h4">Accessories</h4>
            <p>{accessoriesCount} models</p>
          </div>
        </div>

        <div className="gray-rectangle" />
      </div>
    </div>
  );
};
