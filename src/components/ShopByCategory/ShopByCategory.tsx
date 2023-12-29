import './ShopByCategory.scss';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../../store';
import { Categories } from '../../types/Categories';
import phones from '../../assets/categories/category-phones.png';
import tablets from '../../assets/categories/category-tablets.png';
import accessories from '../../assets/categories/category-accessories.png';

const allCategories: { [key in Categories]: string } = {
  [Categories.Phones]: phones,
  [Categories.Tablets]: tablets,
  [Categories.Accessories]: accessories,
};

export const ShopByCategory = () => {
  const { products } = useContext(GlobalContext);

  const modelsAmount = (type: string) => products
    .filter(product => product.category === type).length;
  const capitalizeFirstLetter = (word: string) => word[0].toUpperCase()
    + word.slice(1);

  return (
    <section
      className="shop-by-category"
      data-cy="categoryLinksContainer"
    >
      <h1 className="shop-by-category__title">Shop by category</h1>

      <div className="shop-by-category__content">
        {Object.entries(allCategories).map(([category, image]) => {
          return (
            <Link
              to={`/${category}`}
              className="shop-by-category__category"
              key={category}
            >
              <div className="shop-by-category__category-wrapper">
                <img
                  src={image}
                  alt={category}
                  className="shop-by-category__category-image"
                />
              </div>
              <p className="shop-by-category__category-title">
                {capitalizeFirstLetter(category)}
              </p>
              <span className="shop-by-category__category-amount">
                {`${modelsAmount(category)} models`}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
