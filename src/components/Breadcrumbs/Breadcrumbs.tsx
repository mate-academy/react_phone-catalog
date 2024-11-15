import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './Breadcrumbs.module.scss';
import homeIcon from '../../../public/img/icons/Home.svg';
import strokeRight from '../../../public/img/icons/StrokeRight.svg';

interface ProductDetailsPageProps {
  categor?: string;
  productDescription: Product | Product[];
}

export const Breadcrumbs: React.FC<ProductDetailsPageProps> =({ productDescription, categor = 'Favorites', }) => {

  const { category = categor, itemId } = useParams<{
    itemId: string;
    category?: string;
  }>();

  const categoryName = category || categor;

  return (
    <nav className={styles.breadcrumbs}>
        <Link to="/">
          <img
            src={homeIcon}
            alt="Home"
            className={`${styles.breadcrumbs__item} ${styles.breadcrumbs__itemHome}`}
          />
        </Link>
        <span className={styles.breadcrumbs__separator}>/</span>

        <img src={strokeRight} alt="Previous"></img>

        <span className={styles.breadcrumbs__separator}>/</span>
        <Link to={`/${categoryName}`}
          className={`${styles.breadcrumbs__item} ${styles.itemCategory}`}>
          {categoryName}
        </Link>
        <span className={styles.breadcrumbs__separator}>/</span>

        {itemId && (
          <>
            <img src={strokeRight} alt="Previous"></img>
            <span className={styles.breadcrumbs__separator}>/</span>
            <Link to={`/product/${(productDescription as Product).id}`}
              className={`${styles.breadcrumbs__item} ${styles.itemName}`}>
              {(productDescription as Product).name}
            </Link>
          </>
        )}
      </nav>

  )
}
