/* eslint-disable react/require-default-props */
// Breadcrumbs.js
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbItem from './BreadcrumbItem';
import '../../styles/styles.scss';

type Props = {
  productName?: string, // Optional prop
};

const Breadcrumbs: FC<Props> = ({ productName }) => {
  const location = useLocation();
  const pathArray = location.pathname.split('/');

  return (
    <nav aria-label="breadcrumb">
      <h2>{location.pathname}</h2>
      <ol className="breadcrumb__breadcrumb-list">
        {pathArray.map((item, index) => {
          if (index === 2 && productName) {
            return (
              <li
                className="breadcrumb__breadcrumb-item breadcrumb-item"
                key={item}
              >
                <BreadcrumbItem
                  text={productName}
                  link={location.pathname}
                />
              </li>
            );
          }

          return (
            <li
              className="breadcrumb__breadcrumb-item breadcrumb-item"
              key={item}
            >
              <BreadcrumbItem
                text={item}
                link={`/${item}`}
              />
            </li>
          );
        })}

      </ol>
    </nav>
  );
};

export default Breadcrumbs;
