import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAccessories, getPhones, getTablets } from '../../api/products';
import { categories } from './utils';
import './categories.scss';

export const Categories: React.FC = () => {
  const [phonesLength, setPhonesLength] = useState(0);
  const [tabletsLength, setTabletsLength] = useState(0);
  const [accessoriesLength, setAccessoriesLength] = useState(0);

  function getModelsLength(modifier: string) {
    switch (modifier) {
      case 'phone':
        return phonesLength;
      case 'tablet':
        return tabletsLength;
      case 'accessories':
        return accessoriesLength;
      default:
        return 0;
    }
  }

  useEffect(() => {
    getPhones()
      .then(phones => setPhonesLength(phones.length));
    getTablets()
      .then(tablets => setTabletsLength(tablets.length));
    getAccessories()
      .then(accessories => setAccessoriesLength(accessories.length));
  }, []);

  return (
    <div className="categories">
      <h1 className="categories__title">Shop by category</h1>

      <div
        className="categories__links"
        data-cy="categoryLinksContainer"
      >
        {categories.map(({
          name, modifier, image, link,
        }) => (
          <Link to={link} className="categories__link" key={link}>
            <div
              className={`categories__link-image-container
              categories__link-image-container--${modifier}`}
            >
              <img
                className="categories__link-image"
                src={image}
                alt={name}
              />
            </div>

            <h3 className="categories__link-title">{name}</h3>

            <p className="categories__models">{`${getModelsLength(modifier)} models`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
