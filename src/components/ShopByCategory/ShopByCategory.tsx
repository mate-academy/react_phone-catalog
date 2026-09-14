import React from 'react';
import { Link } from 'react-router-dom';
import Phone from '/img/category-phones.webp';
import Tablet from '/img/category-tablets.png';
import Accessor from '/img/category-accessories.png';
import './ShopByCategory.scss';
import { useProducts } from '../../context/ProductsContext';
export const ShopByCategory: React.FC = () => {
  const { products } = useProducts();
  const phonesCount = products.filter(
    product => product.category === 'phones',
  ).length;
  const tabletsCount = products.filter(
    product => product.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    product => product.category === 'accessories',
  ).length;

  return (
    <>
      <h2 className="titel">Shop by category</h2>
      <Link
        className="link"
        to="phones"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className="link__image ">
          <img className="link__image--items" src={Phone} alt="" />
        </div>
        <div>
          <div className="link__text">
            <h3 className="link__text--titel">Mobile phones</h3>
            <p className="link__text--item">{phonesCount} models</p>
          </div>
        </div>
      </Link>
      <Link
        className="link"
        to="tablets"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className="link__image">
          <img className="link__image--items" src={Tablet} alt="" />
        </div>
        <div>
          <div className="link__text ">
            <h3 className="link__text--titel">Tablets</h3>
            <p className="link__text--item">{tabletsCount} models</p>
          </div>
        </div>
      </Link>
      <Link
        className="link"
        to="accessories"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className="link__image">
          <img className="link__image--items" src={Accessor} alt="" />
        </div>
        <div>
          <div className="link__text ">
            <h3 className="link__text--titel">Accessories</h3>
            <p className="link__text--item">{accessoriesCount} models</p>
          </div>
        </div>
      </Link>
    </>
  );
};
