import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import classes from './title.module.scss';

type Props = ComponentPropsWithoutRef<typeof Skeleton | typeof Text> & {
  isLoaded: boolean;
};

export const Title: FC<Props> = ({
  isLoaded,
  className,
  children,
  ...props
}) => {
  if (!isLoaded) {
    return (
      <Skeleton
        {...props}
        className={cn(classes.title, classes.title_skeleton, className)}
      />
    );
  }

  return (
    <Text.H2 {...props} className={cn(classes.title, className)}>
      {children}
    </Text.H2>
  );
};
