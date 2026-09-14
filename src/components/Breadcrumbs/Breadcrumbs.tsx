import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import house from '../../images/Home.png';
import './Breadcrumbs.scss';
import classNames from 'classnames';
import { useProducts } from '../../context/ProductsContext';
export const Breadcrumbs: React.FC = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const { products } = useProducts();
  const product = products.find(item => item.itemId === productId);
  const category = pathname.split('/').filter(Boolean)[0];
  const categoryName: Record<string, string> = {
    phones: 'Phones',
    tablets: 'Tablets',
    accessories: 'Accessories',
    favorits: 'Favourites',
    orders: 'Cart',
  };
  const title = categoryName[category] || 'Catalog';

  return (
    <>
      <nav className="breadcrumbs">
        <Link className="breadcrumbs--link " to="/">
          <img src={house} alt="Home" />
        </Link>
        <span className="breadcrumbs--Chevron">{'>'}</span>

        <Link
          className={classNames('breadcrumbs--link', { NotActive: product })}
          to={`/${category}`}
        >
          {title}
        </Link>
        {product && <span className="breadcrumbs--Chevron"> {'>'} </span>}

        <span className="breadcrumbs--Chevron">{product?.name}</span>
      </nav>
    </>
  );
};
