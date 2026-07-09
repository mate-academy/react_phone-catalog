import { NavLink } from 'react-router-dom';
import styles from './TopPage.module.scss';
import home from '../../images/Icons/home.svg';
import arrow from '../../images/Icons/Arrow-Righ-Gray.png';
import classNames from 'classnames';
import { ProductPreview } from '../../types';

type Props = {
  title: string;
  products?: ProductPreview[];
  category?: string;
  productName?: string;
};

export const TopPage: React.FC<Props> = ({
  title,
  products,
  category,
  productName,
}) => {
  return (
    <div className={styles.topPage}>
      <div className={styles.topPage__path}>
        <NavLink to="/home" className={styles.topPage__pathHomeLink}>
          <img src={home} alt="" />
        </NavLink>
        <div className={styles.topPage__pathArrow}>
          <img src={arrow} alt="" />
        </div>
        <NavLink
          to={`/${category}`}
          className={classNames(`${styles.topPage__pathTitle}`, {
            [styles.topPage__patTitleWhite]: productName,
          })}
        >
          {title}
        </NavLink>
        {productName && (
          <>
            <div className={styles.topPage__pathArrow}>
              <img src={arrow} alt="" />
            </div>
            <p className={styles.topPage__pathName}>{productName}</p>
          </>
        )}
      </div>

      <div className={styles.topPage__mainTitle}>
        <h1 className={styles.topPage__mainTitleLible}>{title}</h1>
        {products && (
          <p
            className={styles.topPage__mainTitleCounter}
          >{`${products?.length} models`}</p>
        )}
      </div>
    </div>
  );
};
