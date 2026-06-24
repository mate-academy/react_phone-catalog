import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './PathToPage.module.scss';
import {
  TITLES,
  Category,
  isCategory,
} from '../../../../../public/api/types/Titles';
import { Good } from '../../../../../public/api/types/Good';
import { Theme } from '../../../../../public/api/types/theme';
import { useLocation } from 'react-router-dom';

type Props = {
  product: Good;
  theme: string;
};

export const PathToPage: React.FC<Props> = ({ product, theme }) => {
  const { category: rawCategory } = useParams();
  const fallback = isCategory(product.namespaceId)
    ? product.namespaceId
    : 'phones';
  const category: Category = isCategory(rawCategory) ? rawCategory : fallback;
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div
        className={[
          styles.models,
          theme === Theme.LIGHT ? styles['models--light'] : '',
        ].join(' ')}
      >
        <div className={styles.models__breadcrumb}>
          <Link to="/">
            {theme === Theme.DARK ? (
              <img
                src="img/icons/Home.svg"
                alt="Home"
                className={styles.models__breadcrumb__icon}
              />
            ) : (
              <img
                src="img/icons/HomeLig.svg"
                alt="Home"
                className={styles.models__breadcrumb__icon}
              />
            )}
          </Link>
          <img
            src="img/icons/ArrowRight.svg"
            alt="ArrowRight"
            className={styles.models__breadcrumb__icon}
          />
          <Link to={`/${category}`}>
            <span className={styles.models__breadcrumb__lastPage}>
              {TITLES[category]}
            </span>
          </Link>
          <img
            src="img/icons/ArrowRight.svg"
            alt=""
            className={styles.models__breadcrumb__icon}
          />
          <span className={styles.models__breadcrumb__currentPage}>
            {product.name}
          </span>
        </div>

        <div className={styles.models__backbutton}>
          <div className={styles.models__backbutton__back} onClick={handleBack}>
            <span className={styles.models__backbutton__icon} />
            <p className={styles.models__backbutton__button}>Back</p>
          </div>
        </div>
      </div>
    </>
  );
};
