import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import './Breadcrumbs.scss';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  items: Crumb[];
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__home" aria-label="Home">
            <Icon name="home" />
          </Link>
        </li>

        {items.map(item => (
          <li key={item.label} className="breadcrumbs__item">
            <Icon name="chevron-right" className="breadcrumbs__separator" />
            {item.to ? (
              <Link to={item.to} className="breadcrumbs__link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumbs__current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
