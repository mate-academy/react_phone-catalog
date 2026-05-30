import { Link, NavLink } from 'react-router-dom';
import styles from './Path.module.scss';
import { ArrowIcon } from '../icons/Arrow';

type Props = {
  productId?: string;
  category: string;
};

export const Path = ({ productId, category }: Props) => {
  return (
    <div className={styles.path}>
      <Link className={styles.buttonHome} to="/">
        <img src="/img/catalog/icons/Home.svg" alt="Home" />
      </Link>
      <ArrowIcon />
      <NavLink to={`/${category}`}>
        <p className={styles.pageName}>{category}</p>
      </NavLink>
      {productId && (
        <>
          <ArrowIcon />
          <NavLink to={`/${category}/${productId}`}>
            <p className={styles.productName}>{productId}</p>
          </NavLink>
        </>
      )}
    </div>
  );
};
