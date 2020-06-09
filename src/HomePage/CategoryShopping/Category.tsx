import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import './Category.scss';
import {ServerData} from '../../Additional/additional_api';

export const Category = () => {
  const [serverData, setServerData] = useState([]);
  const [mobiles, setMobiles] = useState(0);
  const [tablets, setTablets] = useState(0);
  const [accessories, setAccessories] = useState(0);
  const dataFromServer = useContext(ServerData);

  useEffect(() => {
    dataFromServer.then(data => setServerData(data));
    setMobiles(serverData.filter((el: { type: string }) => el.type === 'phone').length);
    setTablets(serverData.filter((el: { type: string }) => el.type === 'tablet').length);
    setAccessories(serverData.filter((el: { type: string }) => el.type === 'accessories').length);
  }, [serverData, dataFromServer]);


  return (
    <div className="Category">
      <h1 className="Category__title">Shop by category</h1>
      <div className="Category__list_wrapper">
        <ul className="Category__list">
          <li>
            <NavLink to="/phones" className="Category__list_item cli">
              <div className="cli__img_wrapper-mobile cli__img_wrapper">
                <img
                  className="cli__img"
                  alt="mobile phones"
                  src="img/categories/mobiles.png"
                />
              </div>
              <p className="cli__description">Mobile phones</p>
              <span className="cli__count">
              {`${mobiles} models`}
            </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className="Category__list_item cli">
              <div className="cli__img_wrapper-tablet cli__img_wrapper">
                <img
                  className="cli__img"
                  alt="tablets"
                  src="img/categories/tablets.png"
                />
              </div>
              <p className="cli__description">Tablets</p>
              <span className="cli__count">
              {tablets}
                {' '}
                models
            </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className="Category__list_item cli">
              <div className="cli__img_wrapper-accessories cli__img_wrapper">
                <img
                  className="cli__img"
                  alt="accessories"
                  src="img/categories/accessories.png"
                />
              </div>
              <p className="cli__description">Accessories</p>
              <span className="cli__count">
              {accessories}
                {' '}
                models
            </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
