import React from 'react';

import { Link, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';

import homeIcon from '../../../public/img/icons/Home.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';

interface ProductDetailsPageProps {
  productDescription: Product;
}

export const Breadcrumbs: React.FC<ProductDetailsPageProps> =({ productDescription }) => {

  const { category } = useParams<{
    itemId: string;
    category: string;
  }>();

  return (
    <nav className="breadcrumbs">
        <Link to="/">
          <img
            src={homeIcon}
            alt="Home"
            className="breadcrumbs__item breadcrumbs__item--home"
          />
        </Link>
        <span className="breadcrumbs__separator">/</span>
        <a href="#">
          <img src={strokeRight} alt="Previous"></img>
        </a>
        <span className="breadcrumbs__separator">/</span>
        <Link to={`/${category}`} className="breadcrumbs__item item-category">
          {category}
        </Link>
        <span className="breadcrumbs__separator">/</span>
        <a href="#">
          <img src={strokeRight} alt="Previous"></img>
        </a>
        <span className="breadcrumbs__separator">/</span>
        <Link to={`/product/${productDescription?.id}`} className="breadcrumbs__item item-name">
          {productDescription?.name}
        </Link>
      </nav>

  )
}
