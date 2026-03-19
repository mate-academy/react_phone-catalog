import { NavLink } from 'react-router-dom';
import useReactRouterBreadcrumbs, {
  BreadcrumbComponentType,
  BreadcrumbsRoute,
} from 'use-react-router-breadcrumbs';
import cn from 'clsx';
import Home from '/src/images/icons/home.svg?react';
import ArrowRight from '/src/images/icons/arrow-right.svg?react';
import { FC } from 'react';

type CustomBreadcrumbsRoute = BreadcrumbsRoute & {
  linkTo?: string;
};

export const HomeBreadcrumb: BreadcrumbComponentType = () => (
  <Home className="fill-primary dark:fill-d-white size-4" />
);

const defaultRoutes = [{ path: '/', breadcrumb: HomeBreadcrumb }];

type Props = {
  routes?: CustomBreadcrumbsRoute[];
  className?: string;
};

export const Breadcrumbs: FC<Props> = ({ routes = [], className }) => {
  const breadcrumbs = useReactRouterBreadcrumbs([...defaultRoutes, ...routes]);

  return (
    <nav className={cn('', className)}>
      <ul className="flex items-center">
        {breadcrumbs.map(({ breadcrumb, match, location }, index) => {
          const isCurrent = match.pathname === location.pathname;
          const customRoute = match.route as CustomBreadcrumbsRoute;
          const targetPath = customRoute?.linkTo || match.pathname;

          return (
            <li key={match.pathname} className="flex items-center">
              {index > 0 && (
                <ArrowRight
                  aria-hidden
                  className="fill-secondary dark:fill-d-icons mx-2 size-4"
                />
              )}

              {isCurrent ? (
                <span className="text-small text-secondary dark:text-d-secondary line-clamp-1">
                  {breadcrumb}
                </span>
              ) : (
                <NavLink
                  to={targetPath}
                  className="text-small text-primary dark:text-d-white flex"
                >
                  {breadcrumb}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
