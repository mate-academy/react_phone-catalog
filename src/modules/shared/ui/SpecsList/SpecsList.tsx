import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import cn from 'classnames';

import { Text } from '../Text';
import { Skeleton } from '../Skeleton';
import classes from './specsList.module.scss';

export type Spec = { title: string; value: string };

export type RenderProps = {
  children: ReactNode;
  className: string;
};

type Props = ComponentPropsWithoutRef<'ul'> & {
  specs: Spec[];
  isLoaded?: boolean;
  Title?: (props: RenderProps) => ReactNode;
  Value?: (props: RenderProps) => ReactNode;
};

export const SpecsList: FC<Props> = ({
  className,
  specs,
  isLoaded = true,
  Title,
  Value,
  ...props
}) => {
  const ValidTitle = Title ?? (isLoaded ? Text : Skeleton);
  const ValidValue = Value ?? (isLoaded ? Text : Skeleton);

  return (
    <ul {...props} className={cn(classes.specsList, className)}>
      {specs.map(spec => (
        <li className={classes.specsList__item} key={spec.title}>
          <ValidTitle
            className={cn(classes.specsList__itemTitle, {
              [classes.specsList__itemTitle_skeleton]: !isLoaded,
            })}
          >
            {isLoaded && spec.title}
          </ValidTitle>
          <ValidValue
            className={cn(classes.specsList__itemValue, {
              [classes.specsList__itemValue_skeleton]: !isLoaded,
            })}
          >
            {isLoaded && spec.value}
          </ValidValue>
        </li>
      ))}
    </ul>
  );
};
