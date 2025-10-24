import { NavLink } from 'react-router';
import cn from 'clsx';
import Home from '/src/assets/icons/home.svg?react';
import ArrowRight from '/src/assets/icons/arrow-right.svg?react';
import { FC, Fragment } from 'react';
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';

type BreadcrumbsProps = {
  className?: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ className }) => {
  // const matches = useMatches();
  const breadcrumbs = useReactRouterBreadcrumbs();

  return (
    <ul className={cn('flex items-center gap-[8px]', className)}>
      {/*{matches*/}
      {/*  .filter(match => match.handle && match.handle.breadcrumb)*/}
      {/*  .map((match, i) => (*/}
      {/*    <li key={i}>*/}
      {/*      <NavLink*/}
      {/*        to={match.pathname}*/}
      {/*        className="flex text-small text-primary"*/}
      {/*      >*/}
      {/*        {match.handle.breadcrumb(match)}*/}
      {/*      </NavLink>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {breadcrumbs.map(({ breadcrumb, match, location }) => {
        const isRoot = match.pathname === '/';
        const isCurrent = match.pathname === location.pathname;

        return (
          <Fragment key={match.pathname}>
            {isRoot ? (
              <NavLink
                key={match.pathname}
                to={match.pathname}
                className="flex text-small text-primary"
              >
                <Home
                  key={match.pathname}
                  className="size-[16px] fill-primary"
                />
              </NavLink>
            ) : (
              <>
                <ArrowRight className="size-[16px] fill-secondary" />
                {isCurrent ? (
                  <span className="flex text-small text-secondary">
                    {breadcrumb}
                  </span>
                ) : (
                  <NavLink
                    to={match.pathname}
                    className="flex text-small text-primary"
                  >
                    {breadcrumb}
                  </NavLink>
                )}
              </>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};
