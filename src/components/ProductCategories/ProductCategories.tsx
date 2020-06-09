import React from 'react';
import { NavLink } from 'react-router-dom';

let links = [
  { title: ' Mobile phones', path: '/phones', count: 0, cn: 'phones'},
  { title: 'Tablets', path: '/tablets', count: 0, cn: 'tablets'},
  { title: 'Accessories', path: '/accessories', count: 0, cn: 'accessories'},
]

interface ProductCategoriesProps {
  goods: Good[];
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ goods }) => {
  const phonesCount  = goods.filter(good => good.type === 'phone').length;
  links[0].count = phonesCount;
  const tabletsCount = goods.filter(good => good.type === 'tablet').length;
  links[1].count = tabletsCount;
  const accessoriesCount = goods.filter(good => good.type === 'accessorie').length;
  links[2].count = accessoriesCount;

  return (
    <>
      <section className="homepage__products-category products-category">
        <h1 className="homepage__section-title">Shop by category</h1>
        <nav className="products-category__nav">
          <ul className="products-category__list">
            {links.map(({title, path, count, cn}) => (
              <li className="products-category__item">
                <NavLink to={path}
                  className ={`products-category__link products-category__link-${cn}`}
                >
                  <div className="overlay" />
                  <span className="products-category__link-label">
                    {title}
                  </span>
                </NavLink>
                  <h3 className="products-category__category-title">
                    {title}
                  </h3>
                  <span className="products-category__count">{count} models</span>
              </li>
              )
            )}
          </ul>
        </nav>
      </section>
    </>
  )
}
