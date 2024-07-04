/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { RenderProps, SpecsList } from '../../../shared/ui/SpecsList';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import classes from './mainSpecList.module.scss';

type Props = Omit<
  ComponentPropsWithoutRef<typeof SpecsList>,
  'Value' | 'Title'
>;

export const MainSpecList: FC<Props> = ({ isLoaded, ...props }) => {
  const MainSpecsTitle = isLoaded
    ? Text.Small
    : ({ className, ...extraProps }: RenderProps) => (
        <Skeleton
          {...extraProps}
          className={cn(className, classes.mainSpecs__skeleton)}
        />
      );
  const MainSpecsValue = MainSpecsTitle;

  return (
    <SpecsList
      {...props}
      Value={MainSpecsValue}
      Title={MainSpecsTitle}
      isLoaded={isLoaded}
    />
  );
};
