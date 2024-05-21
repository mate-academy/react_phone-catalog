import { Link, useLocation } from 'react-router-dom';
import home from './../../images/icons/home.svg';
import { Container } from '../Container';
import styles from './BreadCrumbs.module.scss';
import React from 'react';

type Props = {
  title: string;
};

export const BreadCrumbs: React.FC<Props> = ({ title }) => {
  const location = useLocation();

  const path = location.pathname.split('/').filter(el => el !== '')[0];
  const getCategory = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <section className={styles.breadcrumbs_section}>
      <Container>
        <ul className={styles.breadCrumbs}>
          <li className={styles.breadCrumb}>
            <Link to="/" replace={true}>
              <img
                src={home}
                alt="Home link"
                className={styles.breadCrumbHome}
              />
            </Link>
          </li>
          <li className={styles.breadCrumb}>
            <Link to={'/' + path} replace={true}>
              {getCategory}
            </Link>
          </li>
        </ul>
        <h1 className={styles.breadCrumbs__title}>{title}</h1>
      </Container>
    </section>
  );
};
