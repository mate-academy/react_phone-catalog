import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsContext } from '../../helpers/ProductsContext';

import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const { productsFromServer } = useContext(ProductsContext);
  const calculateProductsCount = (type: string) => {
    return productsFromServer.reduce((sum, product) => (
      product.type === type ? sum + 1 : sum
    ), 0);
  };

  const phonesCount = calculateProductsCount('phone');
  const tabletsCount = calculateProductsCount('tablet');
  const accessoriesCount = calculateProductsCount('accessory');

  const links = [
    { category: 'phones', title: 'Mobile phones', count: phonesCount },
    { category: 'tablets', title: 'Tablets', count: tabletsCount },
    { category: 'accessories', title: 'Accessories', count: accessoriesCount },
  ];

  return (
    <section
      className="shop-by-category"
      data-cy="categoryLinksContainer"
    >
      <div className="main-container">
        <h1>Shop by category</h1>
        <div className="shop-by-category__content">
          <div className="grid">
            {links.map(link => (
              <NavLink
                to={`/${link.category}`}
                className={`shop-by-category__category shop-by-category__category--${link.category}`}
              >
                <div
                  className="shop-by-category__image"
                >
                  <img
                    src={`_new/img/category-${link.category}-v2.jpg`}
                    alt={`${link.category} category`}
                  />
                </div>
                <h3 className="shop-by-category__title">
                  {link.title}
                </h3>
                <div className="shop-by-category__count">
                  {`${link.count} models`}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
