/* eslint-disable max-len */
import React, { useContext } from 'react';
import './Category.scss';
// import phone from '../../../assets/img/Phones -desktop.png';
// import tablets from '../../../assets/img/tablets-tamlets.png';
// import acsess from '../../../assets/img/acsessor - desktop.png';
import { StateContext } from '../../../context/ContextReducer';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export const Category: React.FC = () => {
  const { Tablets, Accessories, phones, darkThem } = useContext(StateContext);

  return (
    <div className="Category">
      <h2 className="Category__title__text">Shop by category</h2>

      <div className="Category__imgs">
        <div className="Category__imgs__img">
          <Link
            to="/Phones"
            className="Category__imgs__img__link Category__imgs__img__link--phone"
          >
            <img
              src="https://olehmarushchak.github.io/react_phone-catalog/static/media/Phones-desktop.464b59621d37fd37fbe8.png"
              alt="phone"
            />

            <div className="hidden">
              <div className="Category__imgs__img__link__hover">
                <img className="Category__imgs__img__link__hover__img Category__imgs__img__link__hover__img--phone" />
              </div>
            </div>
          </Link>

          <h3 className={cn('Category__imgs__img__title', { dark: darkThem })}>
            Mobile phones
          </h3>

          <p className="Category__imgs__img__count">{`${phones.length} model`}</p>
        </div>

        <div className="Category__imgs__img">
          <Link to="/Tablets" className="Category__imgs__img__link">
            <img
              src="https://olehmarushchak.github.io/react_phone-catalog/static/media/tablets-tamlets.ed3dd9df51129690126b.png"
              alt="tablets"
            />

            <div className="hidden">
              <div className="Category__imgs__img__link__hover">
                <img className="Category__imgs__img__link__hover__img Category__imgs__img__link__hover__img--tablets" />
              </div>
            </div>
          </Link>

          <h3 className={cn('Category__imgs__img__title', { dark: darkThem })}>
            Tablets
          </h3>

          <p className="Category__imgs__img__count">{`${Tablets.length} model`}</p>
        </div>

        <div className="Category__imgs__img">
          <Link to="/Accessories" className="Category__imgs__img__link">
            <img
              src="https://olehmarushchak.github.io/react_phone-catalog/static/media/acsessor-desktop.b914f4124f0dab3439fb.png"
              alt="accesories"
            />

            <div className="hidden">
              <div className="Category__imgs__img__link__hover">
                <img className="Category__imgs__img__link__hover__img Category__imgs__img__link__hover__img--accessories" />
              </div>
            </div>
          </Link>

          <h3 className={cn('Category__imgs__img__title', { dark: darkThem })}>
            Accessories
          </h3>

          <p className="Category__imgs__img__count">{`${Accessories.length} model`}</p>
        </div>
      </div>
    </div>
  );
};
