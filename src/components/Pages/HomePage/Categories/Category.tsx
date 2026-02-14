import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Images } from '../../../../images';
import { getAccessories, getPhones, getTablets } from '../../../../api/api';
import * as Service from '../../../../utils/service';
import * as Types from '../../../../types';

type Props = {
  path: Types.Category;
};

export const Categories: React.FC<Props> = ({ path }) => {
  const [phones, setPhones] = useState<Types.ProductDetails[]>([]);
  const [tablets, setTablets] = useState<Types.ProductDetails[]>([]);
  const [accessories, setAccessories] = useState<Types.ProductDetails[]>([]);

  useEffect(() => {
    Promise.all([
      getPhones().then(setPhones),
      getTablets().then(setTablets),
      getAccessories().then(setAccessories),
    ]);
  }, []);

  const getCategoryData = (direction: Types.Category) => {
    switch (direction) {
      case Types.Category.Phones:
        return {
          length: phones.length,
          name: Types.PageName.Phones,
          image: Images.Categoty.Phones,
        };
      case Types.Category.Tablets:
        return {
          length: tablets.length,
          name: Types.PageName.Tablets,
          image: Images.Categoty.Tablets,
        };
      case Types.Category.Accessories:
        return {
          length: accessories.length,
          name: Types.PageName.Accessories,
          image: Images.Categoty.Accessories,
        };
    }
  };

  return (
    <NavLink
      to={`/${path}`}
      className={Service.getPhotoClass(path, false)}
      onClick={Service.scrollWindowTop}
    >
      <div className={Service.getPhotoClass(path, true)}>
        <img
          src={getCategoryData(path).image}
          alt={getCategoryData(path).name}
          className="categories__block--photo"
        />
      </div>

      <div className="phones__text-block">
        <h4>{getCategoryData(path).name}</h4>

        <p className="categories__items-counter">
          {`${getCategoryData(path).length} models`}
        </p>
      </div>
    </NavLink>
  );
};
