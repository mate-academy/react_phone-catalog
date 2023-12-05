import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPhones } from '../../helpers/apis';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    getPhones('products.json')
      .then((data: any) => {
        setPhones(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error loading data:', error);
      });
  }, []);

  return (
    <div className="upperdiv">
      <h1 className="Shopbycategory_title">Shop by category</h1>

      <div data-cy="categoryLinksContainer" className="Shopbycategory">
        <Link to="/phones" className="Shopbycategory_phones">
          <div className="Shopbycategory_phones_image" />
          <h3 className="Shopbycategory_phones_title">Mobile phones</h3>
          <p className="Shopbycategory_phones_models">{`${phones.length} models`}</p>
        </Link>
        <Link to="/tablets" className="Shopbycategory_tablets">
          <div className="Shopbycategory_tablets_image" />
          <h3 className="Shopbycategory_tablets_title">Tablets</h3>
          <p className="Shopbycategory_tablets_models">0 models</p>
        </Link>
        <Link to="/accessories" className="Shopbycategory_accessories">
          <div className="Shopbycategory_accessories_image" />
          <h3 className="Shopbycategory_accessories_title">Accessories</h3>
          <p className="Shopbycategory_accessories_models">0 models</p>
        </Link>
      </div>
    </div>
  );
};
