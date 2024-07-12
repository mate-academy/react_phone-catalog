import React, { useContext } from 'react';
import homeLight from '../../images/homeLight.svg';
import homeDark from '../../images/Home.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { Link } from 'react-router-dom';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import productsList from '../../api/products.json';
import './TabletsPage.scss';
import { ProductPageBlock } from '../ProductPageBlock/ProductPageBlock';

export const TabletsPage = () => {
  const tabletsList = productsList.filter(a => a.category === 'tablets');
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);

  return (
    <main className={getClassName('tablets-page')}>
      <div className={getClassName('nav-block')}>
        <Link to="/" className={getClassName('nav-block__home')}>
          <img src={light ? homeLight : homeDark} alt="Home page" />
        </Link>

        <img src={light ? arrowLight : arrowDark} alt="" />

        <p className={getClassName('nav-block__text')}>Tablets</p>
      </div>

      <h1 className={getClassName('tablets-page__header')}>Tablets</h1>

      <p className={getClassName('tablets-page__header-undertext')}>
        {`${tabletsList.length} models`}
      </p>

      <ProductPageBlock products={tabletsList} />
    </main>
  );
};
