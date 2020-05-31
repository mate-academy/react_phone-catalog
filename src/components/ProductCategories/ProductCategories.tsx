import React from 'react';
import { NavLink } from 'react-router-dom';

let links = [
  { title: ' Mobile phones', path: '/phones', count: 0, cn: 'phones'},
  { title: 'Tablets', path: '/tablets', count: 0, cn: 'tablets'},
  { title: 'Accessories', path: '/accessories', count: 0, cn: 'accessories'},
]

export const ProductCategories = () => (
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
