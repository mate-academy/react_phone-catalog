import React from 'react';
import styles from './Breadcrumbs.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  categoryName?: string,
  productName?: string,
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categoryName, productName,
}) => {
  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <img src="images/icons/Home.png" className={styles.iconHome} />
      </Link>
      <img src="images/icons/Vector.png" className={styles.iconVector} />
      <Link to={`/${categoryName}`}>
        <h4 className={cn(styles.h4, { [styles.h4__white]: productName })}>
          {categoryName}
        </h4>
      </Link>
      {productName &&
        (<img src="images/icons/Vector.png" className={styles.iconVector} />)
      }
      <h4 className={styles.h4__name}>{productName}</h4>
    </div>
  );
};

export default Breadcrumbs;
