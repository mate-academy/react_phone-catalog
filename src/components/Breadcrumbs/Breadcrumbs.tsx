import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import homeIcon from '../../../public/img/icons/Home.svg';
import arrowIcon from '../../../public/img/icons/arrow-right.svg';

const categoryNames: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

interface DynamicBreadcrumbsProps {
  productName?: string;
}

export const Breadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({
  productName,
}) => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);
  const fullProductName = productName
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: 'sans-serif' }}>
      <ol
        itemScope
        itemType="https://schema.org"
        style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '8px',
          fontSize: '14px',
          color: '#8c8c8c',
        }}
      >
        <li itemProp="itemListElement" itemScope itemType="https://schema.org">
          <Link
            itemProp="item"
            to="/"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <img
              src={homeIcon}
              alt="Home"
              style={{ width: '16px', height: '16px' }}
            />
            <span itemProp="name" style={{ display: 'none' }}>
              Home
            </span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;

          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const position = index + 2;

          let label = categoryNames[value] || value;

          if (isLast && productName) {
            label = fullProductName || productName;
          }

          return (
            <React.Fragment key={to}>
              <span
                aria-hidden="true"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={arrowIcon}
                  alt=""
                  style={{ width: '16px', height: '16px' }}
                />
              </span>

              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org"
              >
                {isLast ? (
                  <span itemProp="name" style={{ color: '#8c8c8c' }}>
                    {label}
                  </span>
                ) : (
                  <Link
                    itemProp="item"
                    to={to}
                    style={{ color: '#111', textDecoration: 'none' }}
                  >
                    <span itemProp="name">{label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
