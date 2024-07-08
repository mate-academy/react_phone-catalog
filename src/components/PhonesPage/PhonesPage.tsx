/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import homeLight from '../../images/homeLight.svg';
import homeDark from '../../images/Home.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { Link } from 'react-router-dom';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import productsList from '../../api/products.json';
import './PhonesPage.scss';
import { ProductPageBlock } from '../ProductPageBlock/ProductPageBlock';

export const PhonesPage = () => {
  const phonesList = productsList.filter(a => a.category === 'phones');
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);

  return (
    <main className={getClassName('phones-page')}>
      <div className={getClassName('nav-block')}>
        <Link to="/" className={getClassName('nav-block__home')}>
          <img src={light ? homeLight : homeDark} alt="Home page" />
        </Link>

        <img src={light ? arrowLight : arrowDark} alt="" />

        <p className={getClassName('nav-block__text')}>Phones</p>
      </div>

      <h1 className={getClassName('phones-page__header')}>Mobile phones</h1>

      <p className={getClassName('phones-page__header-undertext')}>
        {`${phonesList.length} models`}
      </p>

      <ProductPageBlock products={phonesList} />
    </main>
  );
};
