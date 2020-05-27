import React, { useContext, useEffect, useState } from 'react';
import './Category.scss';
import { DFS } from '../../Additional/additional_api';

export const Category = () => {
  const [mobiles, setMobiles] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const dataFromServer = useContext(DFS);

  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { type: string }) => el
        .type === 'phone')).then(data => setMobiles(data));

    dataFromServer.then(data => data
      .filter((el: { type: string }) => el
        .type === 'tablet')).then(data => setTablets(data));

    dataFromServer.then(data => data
      .filter((el: { type: string }) => el
        .type === 'accessories')).then(data => setAccessories(data));
  }, [dataFromServer]);

  return (
    <div className="Category">
      <h1 className="Category__title">Shop by category</h1>
      <div className="Category__list_wrapper">
        <ul className="Category__list">
          <li className="Category__list_item cli">
            <div className="cli__img_wrapper-mobile cli__img_wrapper">
              <img
                className="cli__img"
                alt="mobile phones"
                src="img/categories/mobiles.png"
              />
            </div>
            <p className="cli__description">Mobile phones</p>
            <span className="cli__count">
              {mobiles.length}
              {' '}
              models
            </span>
          </li>
          <li className="Category__list_item cli">
            <div className="cli__img_wrapper-tablet cli__img_wrapper">
              <img
                className="cli__img"
                alt="tablets"
                src="img/categories/tablets.png"
              />
            </div>
            <p className="cli__description">Mobile phones</p>
            <span className="cli__count">
              {tablets.length}
              {' '}
              models
            </span>
          </li>
          <li className="Category__list_item cli">
            <div className="cli__img_wrapper-accessories cli__img_wrapper">
              <img
                className="cli__img"
                alt="accessories"
                src="img/categories/accessories.png"
              />
            </div>
            <p className="cli__description">Mobile phones</p>
            <span className="cli__count">
              {accessories.length}
              {' '}
              models
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
