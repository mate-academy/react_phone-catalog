import React, { ComponentPropsWithoutRef, FC } from 'react';
import { Link, useMatches } from 'react-router-dom';
import cn from 'classnames';

import { Icon } from '../ui/Icon';
import { Text } from '../ui/Text';
import { hasCrumb } from './utils/hasCrumb';
import classes from './breadcrumbs.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

export const Breadcrumbs: FC<Props> = ({ className, ...props }) => {
  const matches = useMatches();

  const crumbs = matches
    .filter(match => hasCrumb(match.handle))
    .map((match, index, filteredCrumbs) => {
      if (!hasCrumb(match.handle)) {
        return null;
      }

      const currentCrumb = (
        <Text.Small className={classes.crumb}>
          {match.handle.crumb()}
        </Text.Small>
      );

      if (index === filteredCrumbs.length - 1) {
        return <React.Fragment key={index}>{currentCrumb}</React.Fragment>;
      }

      return (
        <React.Fragment key={index}>
          <Link
            to={match.pathname}
            className={cn(classes.crumb, classes.crumb_link)}
          >
            {currentCrumb}
          </Link>
          <Icon variant="arrow-right" />
        </React.Fragment>
      );
    });

  return (
    <div {...props} className={cn(classes.crumbs, className)}>
      {crumbs}
    </div>
  );
};
