import { useEffect, useState } from 'react';
import './Categories.scss';
import { NavLink } from 'react-router-dom';
import { getAccessories, getPhones, getTablets } from '../../api/api';
import { BASE_URL } from '../../api/api';

export const Categories = () => {
  const [phonesQuantity, setPhonesQuantity] = useState(0);
  const [tabletsQuantity, setTabletsQuantity] = useState(0);
  const [accessoriesQuantity, setAccessoriesQuantity] = useState(0);

  useEffect(() => {
    getPhones.then(phones => {
      setPhonesQuantity(phones.length);
    });

    getTablets.then(tablets => {
      setTabletsQuantity(tablets.length);
    });

    getAccessories.then(accessories => {
      setAccessoriesQuantity(accessories.length);
    });
  }, []);

  return (
    <div className="categories categories--margin-top">
      <div className="categories__container">
        <h2 className="page__subtitle">Shop by category</h2>
        <ul className="categories__list">
          <li className="categories__item">
            <NavLink to="/phones" className="categories__link">
              <div
                className="categories__image-container
                  categories__image-container--phones"
              >
                <img
                  src={`${BASE_URL}/img/category-phones.webp`}
                  alt="Mobile Phones"
                  className="categories__image categories__image--phones"
                />
              </div>
              <p className="categories__name">Mobile phones</p>
              <p className="categories__quantity">{`${phonesQuantity} models`}</p>
            </NavLink>
          </li>
          <li className="categories__item">
            <NavLink to="/tablets" className="categories__link">
              <div
                className="categories__image-container
                  categories__image-container--tablets"
              >
                <img
                  src={`${BASE_URL}/img/category-tablets.png`}
                  alt="Tablets"
                  className="categories__image categories__image--tablets"
                />
              </div>
              <p className="categories__name">Tablets</p>
              <p className="categories__quantity">{`${tabletsQuantity} models`}</p>
            </NavLink>
          </li>
          <li className="categories__item">
            <NavLink to="/accessories" className="categories__link">
              <div
                className="categories__image-container
                  categories__image-container--accessories"
              >
                <img
                  src={`${BASE_URL}/img/category-accessories.webp`}
                  alt="Accessories"
                  className="categories__image categories__image--accessories"
                />
              </div>
              <p className="categories__name">Accessories</p>
              <p className="categories__quantity">{`${accessoriesQuantity} models`}</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
