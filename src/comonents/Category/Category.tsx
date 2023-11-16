import { Link } from 'react-router-dom';
import { useProducts } from '../ProductContext';

import './Category.scss';

export const Category = () => {
  const { links, products } = useProducts();

  const filterProductsByType = (productType: string) => {
    return products.filter(product => product.type === productType);
  };

  const renderContext = (link: string) => {
    let title = '';
    let productType = '';

    if (link === 'tablets') {
      title = 'Tablets';
      productType = 'tablet';
    }

    if (link === 'accessories') {
      title = 'Accessories';
      productType = 'accessory';
    }

    if (link === 'phones') {
      title = 'Mobile phones';
      productType = 'phone';
    }

    const filteredProducts = filterProductsByType(productType);

    return (
      <>
        <h3 className="text text--h3">{title}</h3>
        <p className="text text--gray">
          {`${filteredProducts.length} models`}
        </p>
      </>
    );
  };

  return (
    <>
      <h1 className="text text--h1">
        Shop by category
      </h1>

      <ul className="category__container">
        {links.map(link => (
          <li
            key={link}
            data-cy="categoryLinksContainer"
            className="category__link-container"
          >
            <Link
              to={`/${link}`}
              className={`category__link category__link--${link}`}
            >
              <img
                src={`img/category/category-${link}.png`}
                alt="category"
              />
            </Link>

            <div className="category__title-container">
              {renderContext(link)}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
