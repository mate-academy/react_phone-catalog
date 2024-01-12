/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import './BreadCrumbsMenu.scss';

type Props = {
  category: string,
  nameProduct?: string,
};

export const BreadcrumbsMenu: React.FC<Props> = ({
  category,
  nameProduct,
}) => {
  return (
    <nav
      className="breadcrumbs-menu"
      data-cy="breadCrumbs"
    >
      <ul className="breadcrumbs-menu__breadcrumbs-nav-items">
        <li className="breadcrumbs-menu__breadcrumbs-nav-item">
          <Link
            to="/"
            className="icon icon--home-breadcrumds-menu"
          />
        </li>

        <li className="breadcrumbs-menu__breadcrumbs-nav-item">
          <div className="icon icon--arrow-right" />

          {
            nameProduct ? (
              <Link
                to="/phones"
                className="breadcrumbs-menu__breadcrumbs-nav-link"
              >
                {category}
              </Link>
            ) : (
              <p
                className="breadcrumbs-menu__breadcrumbs-nav-text"
              >
                {category}
              </p>
            )
          }
        </li>

        {
          nameProduct && (
            <li className="breadcrumbs-menu__breadcrumbs-nav-item">
              <div className="icon icon--arrow-right" />

              <p
                className="breadcrumbs-menu__breadcrumbs-nav-text"
              >
                {nameProduct}
              </p>
            </li>
          )
        }
      </ul>
    </nav>
  );
};
