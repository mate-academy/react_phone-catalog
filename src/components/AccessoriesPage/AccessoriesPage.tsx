import React, { useContext } from 'react';
import homeLight from '../../images/homeLight.svg';
import homeDark from '../../images/Home.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { Link } from 'react-router-dom';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import productsList from '../../api/products.json';
import './AccessoriesPage.scss';
import { ProductPageBlock } from '../ProductPageBlock/ProductPageBlock';

export const AccessoriesPage = () => {
  const accessoriesList = productsList.filter(
    a => a.category === 'accessories',
  );
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);

  return (
    <main className={getClassName('accessories-page')}>
      <div className={getClassName('nav-block')}>
        <Link to="/" className={getClassName('nav-block__home')}>
          <img src={light ? homeLight : homeDark} alt="Home page" />
        </Link>

        <img src={light ? arrowLight : arrowDark} alt="" />

        <p className={getClassName('nav-block__text')}>Tablets</p>
      </div>

      <h1 className={getClassName('accessories-page__header')}>Tablets</h1>

      <p className={getClassName('accessories-page__header-undertext')}>
        {`${accessoriesList.length} models`}
      </p>

      <ProductPageBlock products={accessoriesList} />
    </main>
  );
};
