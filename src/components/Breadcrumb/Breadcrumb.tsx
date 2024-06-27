import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';
type Props = {
  productName?: string;
};

export const Breadcrumb: React.FC<Props> = ({ productName = '' }) => {
  const { pathname } = useLocation();
  const { darkTheme } = useContext(ProductContext);
  const [category] = pathname.slice(1).split('/');
  const categoryName = category[0].toUpperCase() + category.slice(1);

  return (
    <div
      className={classNames(`${styles.container} text--grey text--small`, {
        [styles.container__darkTheme]: darkTheme,
      })}
    >
      <Link to="/">
        <div className={`icon icon--home ${styles.icon}`}></div>
      </Link>

      <div className=" icon icon--arrow icon--notActive"></div>
      <Link
        to={`/${category}`}
        className={`link text--grey ${styles.text} ${styles.text__main}`}
      >{`${categoryName}`}</Link>

      {productName && (
        <>
          <div className="icon icon--arrow icon--notActive"></div>
          <span
            className={`${styles.text} ${styles.productName}`}
          >{`${productName}`}</span>
        </>
      )}
    </div>
  );
};

export const BreadcrumbBack: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ProductContext);

  return (
    <div
      className={classNames(`${styles.container} text--grey text--small`, {
        [styles.container__darkTheme]: darkTheme,
      })}
    >
      <div className={`icon icon--arrow ${styles.iconBack}`}></div>
      <p
        className={`link text--grey ${styles.text} ${styles.text__main}`}
        onClick={() => navigate(-1)}
      >
        Back
      </p>
    </div>
  );
};
