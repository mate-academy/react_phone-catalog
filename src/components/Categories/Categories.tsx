import { Link } from "react-router-dom";
import React from "react";
import "./Categories.scss";
import phones from "../../photo/category-phones.png";
import tablets from "../../photo/category-tablets.png";
import accessories from "../../photo/category-accessories.png";
import { Product } from "../../types/Product";

interface Props {
  products: Product[];
}

export const Categories: React.FC<Props> = ({ products }) => {
  const categoryAmount = (type: string) => {
    return products.filter((item) => item.category === type).length;
  };

  return (
    <section className="categories" data-cy="categoryLinksContainer">
      <h1 className="categories__title">Shop by category</h1>

      <div className="categories__content">
        <Link className="categories__item" to="/phones">
          <div>
            <img
              src={phones}
              alt="category-phones"
              className="categories__item--img"
            />
          </div>
          <p className="categories__item--title">Mobile phones</p>
          <span className="categories__item--amount">
            {`${categoryAmount("phones")} models`}
          </span>
        </Link>
        <Link className="categories__item" to="/tablets">
          <div>
            <img
              src={tablets}
              alt="category-tablets"
              className="categories__item--img categories__item--tablets"
            />
          </div>
          <p className="categories__item--title">Tablets</p>
          <span className="categories__item--amount">
            {`${categoryAmount("tablets")} models`}
          </span>
        </Link>
        <Link className="categories__item" to="/accessories">
          <div>
            <img
              src={accessories}
              alt="category-accessories"
              className="categories__item--img
              categories__item--img-accessories"
            />
          </div>
          <p className="categories__item--title">Accessories</p>
          <span className="categories__item--amount">
            {`${categoryAmount("accessories")} models`}
          </span>
        </Link>
      </div>
    </section>
  );
};
