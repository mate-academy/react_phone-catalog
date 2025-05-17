import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import breadcrumbsStyles from './Breadcrumbs.module.scss';
import { IconSvg } from '../IconSvg/IconSvg';
import { ICON_DATA_PATHS } from '../../constants/iconDataPaths';
import { getCapitalizationFirstLetter } from '../../helpers/stringHelper';
import classNames from 'classnames';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { useCategories } from '../../context/CategoriesContext';
import { useMemo } from 'react';

export const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const { categories } = useCategories();
  const categoriesNames = categories.map(category => category.name);
  const validPages = useMemo(
    () => [...categoriesNames, ROUTES.FAVORITES],
    [categoriesNames],
  );

  if (
    breadcrumbs.length === 0 ||
    !breadcrumbs.some(breadcrumb => validPages.includes(breadcrumb.name))
  ) {
    return null;
  }

  return (
    <nav className={breadcrumbsStyles.breadcrumbs}>
      <ul className={breadcrumbsStyles.breadcrumbs__list}>
        <li>
          <Link
            to={ROUTES.HOME}
            className={breadcrumbsStyles.breadcrumbs__label}
          >
            <IconSvg dataPath={ICON_DATA_PATHS.HOME} />
          </Link>
        </li>
        {breadcrumbs.map(({ name, isProduct = false }, index) => {
          const routeTo = `/${breadcrumbs
            .map(breadcrumb => breadcrumb.name)
            .slice(0, index + 1)
            .join('/')}`;
          const isLast = index === breadcrumbs.length - 1;
          const formattedName = isProduct
            ? name
            : getCapitalizationFirstLetter(name);

          return (
            <li
              key={name}
              className={classNames(breadcrumbsStyles.breadcrumbs__item, {
                [breadcrumbsStyles['breadcrumbs__item--last']]: isLast,
              })}
            >
              <IconSvg
                dataPath={ICON_DATA_PATHS.ARROW.RIGHT}
                className={breadcrumbsStyles.breadcrumbs__separator}
              />
              {isLast ? (
                <span
                  className={classNames(
                    breadcrumbsStyles.breadcrumbs__label,
                    breadcrumbsStyles['breadcrumbs__label--last'],
                  )}
                >
                  {formattedName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className={breadcrumbsStyles.breadcrumbs__label}
                >
                  {formattedName}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
