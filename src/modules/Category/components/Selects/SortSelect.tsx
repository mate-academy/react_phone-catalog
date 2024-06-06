/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { useSearchParamsSelect } from '../../../../hooks/useSearchParamsSelect';
import { Text } from '../../../shared/ui/Text';
import { Select } from '../../../shared/ui/Select';
import { sortOptions, defaulSortOption } from './variables';
import classes from './selects.module.scss';

type Props = ComponentProps<'label'>;

export const SortSelect: FC<Props> = ({ className, ...props }) => {
  const [value, setValue] = useSearchParamsSelect(
    'sort',
    sortOptions,
    defaulSortOption,
  );

  return (
    <label {...props} className={cn(classes.select, className)}>
      <Text.Small className={classes.select__text}>Sort by</Text.Small>

      <Select
        className={classes.select__control}
        value={value}
        onChange={setValue}
        options={sortOptions}
      />
    </label>
  );
};
