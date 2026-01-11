import { NavLink } from 'react-router-dom';
import useReactRouterBreadcrumbs, {
  BreadcrumbComponentType,
  BreadcrumbsRoute,
} from 'use-react-router-breadcrumbs';
import cn from 'clsx';
import Home from '/src/assets/icons/home.svg?react';
import ArrowRight from '/src/assets/icons/arrow-right.svg?react';
import { FC } from 'react';

type CustomBreadcrumbsRoute = BreadcrumbsRoute & {
  linkTo?: string;
};

const HomeBreadcrumb: BreadcrumbComponentType = () => (
  <Home className="size-4 fill-primary" />
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
      <ol className="flex items-center">
        {breadcrumbs.map(({ breadcrumb, match, location }, index) => {
          const isCurrent = match.pathname === location.pathname;
          const customRoute = match.route as CustomBreadcrumbsRoute;
          const targetPath = customRoute?.linkTo || match.pathname;

          return (
            <li key={match.pathname} className="flex items-center">
              {index > 0 && (
                <ArrowRight
                  aria-hidden
                  className="mx-2 size-4 fill-secondary"
                />
              )}

              {isCurrent ? (
                <span className="text-small text-secondary line-clamp-1">
                  {breadcrumb}
                </span>
              ) : (
                <NavLink
                  to={targetPath}
                  className="flex text-small text-primary"
                >
                  {breadcrumb}
                </NavLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
