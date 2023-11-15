/* eslint-disable react/require-default-props */
// Breadcrumbs.js
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbItem from './BreadcrumbItem';
import '../../styles/styles.scss';

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const pathArray = location.pathname.split('/');

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb__breadcrumb-list">
        {pathArray.map((item) => (
          <li
            className="breadcrumb__breadcrumb-item breadcrumb-item"
            key={item}
          >
            <BreadcrumbItem
              text={item}
              link={`/${item}`}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
