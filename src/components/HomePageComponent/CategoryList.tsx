import { useContext } from 'react';
import './CategoryList.scss';
import { ApiContext } from '../../context/ApiContext';
import { NavLink } from 'react-router-dom';

type Category = 'phones' | 'tablets' | 'accessories';

export const CategoryList = () => {
  const products = useContext(ApiContext);

  const getAmountOfProduct = (cat: Category) => {
    return products.filter(item => item.category === cat).length;
  };

  return (
    <article className="category-list">
      <h3 className="titleAndPagination-title">Shop by category</h3>
      <ul className="category-list-box">
        <li className="category-list-product">
          <NavLink
            to="/phones"
            className="category-list-product__link
            category-list-product__link--phone-color"
          >
            <img
              src="./img/category-phones.webp"
              alt="phones"
              className="category-list-product__img"
            />
          </NavLink>
          <div className="category-list-product-info">
            <h4 className="category-list-product-info__name"> Phones</h4>
            <div className="category-list-product-info__amount">
              {getAmountOfProduct('phones')}
            </div>
          </div>
        </li>

        <li className="category-list-product">
          <NavLink
            to="/tablets"
            className="category-list-product__link
          category-list-product__link--tablets-color"
          >
            <img
              src="/img/category-tablets.webp"
              alt="phones"
              className="category-list-product__img"
            />
          </NavLink>
          <div className="category-list-product-info">
            <h4 className="category-list-product-info__name">Tablets</h4>
            <div className="category-list-product-info__amount">
              {getAmountOfProduct('tablets')}
            </div>
          </div>
        </li>

        <li className="category-list-product">
          <NavLink
            to="/accessories"
            className="category-list-product__link
          category-list-product__link--acc-color"
          >
            <img
              src="img/category-accessories.webp"
              alt="phones"
              className="category-list-product__img"
            />
          </NavLink>
          <div className="category-list-product-info">
            <h4 className="category-list-product-info__name">Accessories</h4>
            <div className="category-list-product-info__amount">
              {getAmountOfProduct('accessories')}
            </div>
          </div>
        </li>
      </ul>
    </article>
  );
};
