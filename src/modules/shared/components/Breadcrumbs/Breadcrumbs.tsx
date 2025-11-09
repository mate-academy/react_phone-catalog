import { Link } from 'react-router-dom';
import scss from './Breadcrumbs.module.scss';

interface Props {
  category: string;
  productName?: string;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  const categoryPath = `/${category.toLowerCase()}`;

  return (
    <nav className={scss.breadcrumbs} aria-label="Navigation path">
      <ol className={scss.breadcrumbs__path}>
        <li>
          <Link to="/" className={scss.breadcrumbs__link}>
            <svg
              className={scss.breadcrumbs__icon}
              aria-hidden="true"
              focusable="false"
            >
              <use href="/icons/icons.svg#home-icon"></use>
            </svg>
          </Link>
        </li>
        <li>
          <svg
            className={`${scss.breadcrumbs__icon} ${scss.breadcrumbs__icon_color}`}
            aria-hidden="true"
            focusable="false"
          >
            <use href="/icons/icons.svg#arrow"></use>
          </svg>
        </li>
        <li aria-current={productName ? false : 'page'}>
          <Link to={categoryPath} className={scss.breadcrumbs__link}>
            {capitalize(category)}
          </Link>
        </li>
        {productName && (
          <>
            <li>
              <svg
                className={`${scss.breadcrumbs__icon} ${scss.breadcrumbs__icon_color}`}
                aria-hidden="true"
                focusable="false"
              >
                <use href="/icons/icons.svg#arrow"></use>
              </svg>
            </li>
            <li aria-current="page">
              <span className={scss.breadcrumbs__text}>{productName}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};
