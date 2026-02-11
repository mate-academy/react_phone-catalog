import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { FC } from 'react';
import { FaHome } from 'react-icons/fa';
import { BreadcrumbUI } from '../../types/BreadcrumbUI';
import { FaAngleRight } from 'react-icons/fa6';

interface Props {
  paths: BreadcrumbUI[];
}

export const Breadcrumbs: FC<Props> = ({ paths }) => {
  const allPaths: BreadcrumbUI[] = [
    { label: <FaHome size={18} />, path: '/' },
    ...paths,
  ];

  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbsList}>
        {allPaths.map((item, index, curArr) => {
          const isLastItem = index === curArr.length - 1;

          return (
            <li key={item.path} className={styles.breadcrumbsItem}>
              {item.path ? (
                <Link to={item.path} className={styles.breadcrumbsLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbsText}>{item.label}</span>
              )}

              {!isLastItem ? (
                <span className={styles.splitter}>
                  <FaAngleRight size={16} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
