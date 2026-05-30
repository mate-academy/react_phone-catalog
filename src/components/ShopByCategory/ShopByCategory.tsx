import React from 'react';
import './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';

type Category = {
  name: string;
  title: string;
  image: string;
  count: number;
};

type Props = {
  categories: Category[];
};

export const ShopByCategory: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <div className="shop-by">
        <h2 className="shop-by_title-main">Shop by category</h2>

        <div className="shop-by_wrapper">
          {categories.map((category, index) => (
            <Link to={`/${category.name}`} className="shop-by_link" key={index}>
              <img
                className="shop-by_img"
                src={`/react_phone-catalog/${category.image}`}
                alt="category image"
              />
              <h4 className="shop-by_title">{category.title}</h4>
              <p className="shop-by_text">{category.count} models</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
