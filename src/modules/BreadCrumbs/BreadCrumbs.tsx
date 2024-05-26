import { Link, useLocation, useParams } from 'react-router-dom';
import home from './../../images/icons/home.svg';
import { Container } from '../Container';
import styles from './BreadCrumbs.module.scss';
import React from 'react';
import { useGetDataQuery } from '../../store/api/api';

type Props = {
  title: string;
};

export const BreadCrumbs: React.FC<Props> = ({ title }) => {
  const location = useLocation();
  const { productId } = useParams();
  const { data } = useGetDataQuery();

  const getTitleById = data?.find(product => product.itemId === productId);

  const paths = location.pathname.split('/').filter(el => el !== '');
  const getBreadCrumbs = paths.map(
    path => path.charAt(0).toUpperCase() + path.slice(1).replaceAll('-', ' '),
  );

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
          {getBreadCrumbs.map((breadCrumb, index) => (
            <li key={breadCrumb} className={styles.breadCrumb}>
              {index === getBreadCrumbs.length - 1 ? (
                getTitleById?.name || breadCrumb
              ) : (
                <Link
                  to={'/' + breadCrumb.toLowerCase().replaceAll(' ', '-')}
                  replace={true}
                >
                  {breadCrumb}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <h2 className={styles.breadCrumbs__title}>{title}</h2>
      </Container>
    </section>
  );
};
