import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeProvider/ThemeProvider';
import { themeClass } from '../../../utils/themeClass';
import { Link } from 'react-router-dom';
import Phones from '../../../images/banner-phones.png';
import Tablets from '../../../images/banner-tablets.png';
import Accessories from '../../../images/banner-accessories.png';
import phoneList from '../../../api/phones.json';
import tabletList from '../../../api/tablets.json';
import accessoriesList from '../../../api/accessories.json';
import './Cetegories.scss';

export const Categories = () => {
  const { light } = useContext(ThemeContext);

  const getClassName = themeClass(light);

  return (
    <section className="categories">
      <h2 className={getClassName('categories__header')}>Shop by category</h2>

      <div className="categories__box">
        <Link to={'/phones'} className="categories__box--link">
          <img
            src={Phones}
            alt="Phones"
            className="categories__box--link--pic"
          />

          <h3 className={getClassName('categories__box--link--title')}>
            Mobile phones
          </h3>

          <p
            className={getClassName('categories__box--link--models')}
          >{`${phoneList.length} models`}</p>
        </Link>

        <Link to={'/tablets'} className="categories__box--link">
          <img
            src={Tablets}
            alt="Tablets"
            className="categories__box--link--pic"
          />

          <h3 className={getClassName('categories__box--link--title')}>
            Tablets
          </h3>

          <p
            className={getClassName('categories__box--link--models')}
          >{`${tabletList.length} models`}</p>
        </Link>

        <Link to={'/accessories'} className="categories__box--link">
          <img
            src={Accessories}
            alt="Accessories"
            className="categories__box--link--pic"
          />

          <h3 className={getClassName('categories__box--link--title')}>
            Accessories
          </h3>

          <p
            className={getClassName('categories__box--link--models')}
          >{`${accessoriesList.length} models`}</p>
        </Link>
      </div>
    </section>
  );
};
