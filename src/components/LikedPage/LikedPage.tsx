import React, { useContext } from 'react';
import { LikedContext } from '../LikedProvider/LikedProvider';
/* eslint-disable react-hooks/exhaustive-deps */
import homeLight from '../../images/homeLight.svg';
import homeDark from '../../images/Home.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { Link } from 'react-router-dom';
import arrowLight from '../../images/arrow-rigth-light.svg';
import arrowDark from '../../images/arrow-right-dark.svg';
import './LikedPage.scss';
import { ProductPageBlock } from '../ProductPageBlock/ProductPageBlock';

export const LikedPage = () => {
  const { liked } = useContext(LikedContext);
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);

  return (
    <main className={getClassName('liked-page')}>
      <div className={getClassName('nav-block')}>
        <Link to="/" className={getClassName('nav-block__home')}>
          <img src={light ? homeLight : homeDark} alt="Home page" />
        </Link>

        <img src={light ? arrowLight : arrowDark} alt="" />

        <p className={getClassName('nav-block__text')}>Liked</p>
      </div>

      <h1 className={getClassName('liked-page__header')}>
        {!!liked.length
          ? 'Liked products'
          : 'You do not have any liked products :('}
      </h1>

      <p className={getClassName('liked-page__header-undertext')}>
        {!!liked.length
          ? `${liked.length} models`
          : 'Go and find and find whatever you like'}
      </p>

      <ProductPageBlock products={liked} />
    </main>
  );
};
