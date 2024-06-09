import React, { FC, ReactNode } from 'react';
import { Link, useMatches } from 'react-router-dom';
import { Icon } from '../ui/Icon';

import classes from './breadcrumbs.module.scss';
import { Container } from '../Container';
import cn from 'classnames';

type Props = {};

const hasCrumb = (
  obj: unknown,
): obj is { crumb: (pathname?: string) => ReactNode } => {
  return (
    typeof obj == 'object' &&
    obj !== null &&
    'crumb' in obj &&
    typeof obj.crumb === 'function'
  );
};

export const Breadcrumbs: FC<Props> = ({}) => {
  const matches = useMatches();
  const crumbs = matches
    .filter(match => hasCrumb(match.handle))
    .map((match, index, filteredCrumbs) => {
      if (!hasCrumb(match.handle)) {
        return null;
      }

      if (index === filteredCrumbs.length - 1) {
        return (
          <span className={classes.crumb} key={index}>
            {match.handle.crumb(match.pathname)}
          </span>
        );
      }

      return (
        <React.Fragment key={index}>
          <Link
            to={match.pathname}
            className={cn(classes.crumb, classes.crumb_link)}
          >
            {match.handle.crumb(match.pathname)}
          </Link>
          <Icon variant="arrow-right" />
        </React.Fragment>
      );
    });

  return <Container className={classes.crumbs}>{crumbs}</Container>;
};
