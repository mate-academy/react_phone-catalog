import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AppRoutes } from '../Router';
import { IconArrow } from '../../shared/IconArrow';
import { IconHome } from '../../shared/IconHome';

import breadcrumbsStyles from './Breadcrumbs.module.scss';

type BreadcrumbItem = {
  title: string;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={breadcrumbsStyles.Breadcrumbs} aria-label="Breadcrumbs">
    <Link to={AppRoutes.HOME} className={breadcrumbsStyles.BreadcrumbsHomeLink}>
      <IconHome />
    </Link>

    {items.map(item => (
      <div className={breadcrumbsStyles.BreadcrumbsItem} key={item.title}>
        <span className={breadcrumbsStyles.BreadcrumbsSeparator}>
          <IconArrow direction="Right" />
        </span>

        {item.to ? (
          <Link
            to={item.to}
            className={classNames(
              'font-small',
              breadcrumbsStyles.BreadcrumbsLink,
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span
            className={classNames(
              'font-small',
              breadcrumbsStyles.BreadcrumbsCurrent,
            )}
          >
            {item.title}
          </span>
        )}
      </div>
    ))}
  </nav>
);
