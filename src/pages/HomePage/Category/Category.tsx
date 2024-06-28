import './Category.scss';
import '../../../utils/main.scss';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllProducts } from '../../../features/productssSlice';

export const CategoryItems = () => {
  const dispatch = useAppDispatch();

  const { phones, tablets, accessories } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const BASE_ULR =
    'https://mate-academy.github.io/react_phone-catalog/_new/img/';

  return (
    <div className="category">
      <div className="category__container grid">
        <div
          className="category__top
          grid__item--tablet-1-9
          grid__item--desktop-1-19"
        >
          <h1 className="category__header">Shop by category</h1>
        </div>
        <div
          className="category__block 
          category__block--mobile
          grid__item--tablet-1-4
          grid__item--desktop-1-8"
        >
          <NavLink to="/phones">
            <img
              src={`${BASE_ULR}category-phones.png`}
              alt="Mobile"
              className="category__img category__mobile"
            />
          </NavLink>
          <p className="category__name">Mobile phones</p>
          <div className="category__quantity">{phones.length}</div>
        </div>
        <div
          className="category__block
          category__block--tablets
          grid__item--tablet-5-8
          grid__item--desktop-9-16"
        >
          <NavLink to="/tablets">
            <img
              src={`${BASE_ULR}category-tablets.png`}
              alt="Tablets"
              className="category__img category__tablets"
            />
          </NavLink>
          <p className="category__name">Tablets</p>
          <div className="category__quantity">{tablets.length}</div>
        </div>
        <div
          className="category__block
          category__block--accessories
          grid__item--tablet-9-12
          grid__item--desktop-17-24"
        >
          <NavLink to="/accessories">
            <img
              src={`${BASE_ULR}category-accessories.png`}
              alt="Accessories"
              className="category__img category__accessories"
            />
          </NavLink>
          <p className="category__name">Accessories</p>
          <div className="category__quantity">{accessories.length}</div>
        </div>
      </div>
    </div>
  );
};
