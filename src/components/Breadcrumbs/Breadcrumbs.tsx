import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

export type BreadcrumbItem = {
  label: string;
  to?: string; // якщо немає — це поточна сторінка (без посилання)
};

type Props = {
  items: BreadcrumbItem[];
};

const HomeIcon = () => (
  <svg
    className={cx('breadcrumbs__home-icon')}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 7 8 2l6 5v7H10V9.5H6V14H2z" />
  </svg>
);

const Separator = () => (
  <svg
    className={cx('breadcrumbs__separator')}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 3 5 5-5 5" />
  </svg>
);

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className={cx('breadcrumbs')} aria-label="Breadcrumb">
      <ol className={cx('breadcrumbs__list')}>
        <li className={cx('breadcrumbs__item')}>
          <Link to="/" className={cx('breadcrumbs__link')} aria-label="Home">
            <HomeIcon />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={cx('breadcrumbs__item')}
            >
              <Separator />

              {item.to && !isLast ? (
                <Link to={item.to} className={cx('breadcrumbs__link')}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cx('breadcrumbs__current')}
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
