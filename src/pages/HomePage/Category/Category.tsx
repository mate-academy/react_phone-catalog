import './Category.scss';
import '../../../utils/main.scss';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Category } from '../../../types/category';
import { fetchAllProducts } from '../../../features/allProductsSlice';

export const CategoryItems = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(state => state.allProducts);

  const countItems = (category: string) => {
    return products.filter(item => item.category === category).length;
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const categoryHeader = `category__header theme-${theme}`;
  const categoryName = `category__name theme-${theme}`;
  const categoryQuantity = `category__quantity theme-${theme}`;
  const catgoryImage = `category__img theme-${theme}`;

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
          <h1 className={categoryHeader}>Shop by category</h1>
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
              className={`${catgoryImage} category__mobile`}
            />
          </NavLink>
          <p className={categoryName}>Mobile phones</p>
          <div className={categoryQuantity}>
            {countItems(Category.PHONES)} models
          </div>
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
              className={`${catgoryImage} category__tablets`}
            />
          </NavLink>
          <p className={categoryName}>Tablets</p>
          <div className={categoryQuantity}>
            {countItems(Category.TABLETS)} models
          </div>
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
              className={`${catgoryImage} category__accessories`}
            />
          </NavLink>
          <p className={categoryName}>Accessories</p>
          <div className={categoryQuantity}>
            {countItems(Category.ACCESSORIES)} models
          </div>
        </div>
      </div>
    </div>
  );
};
