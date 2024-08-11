import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import classes from './textWithTitle.module.scss';
import { Skeleton } from '../../../shared/ui/Skeleton';

type Props = ComponentPropsWithoutRef<'div'> & {};

export const TextWithTitleSkeleton: FC<Props> = ({ className, ...props }) => {
  return (
    <div {...props} className={cn(classes.container, className)}>
      <Skeleton
        className={cn(
          classes.container__title,
          classes.container__title_skeleton,
        )}
      />
      <Skeleton
        className={cn(
          classes.container__text,
          classes.container__text_skeleton,
        )}
      />
    </div>
  );
};
