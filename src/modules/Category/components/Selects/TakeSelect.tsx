/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Select } from '../../../shared/ui/Select';
import { Text } from '../../../shared/ui/Text';
import { useSearchParamsSelect } from '../../../../hooks/useSearchParamsSelect';
import { takeOptions, defaulTakeOption } from './variables';
import classes from './selects.module.scss';

type Props = ComponentProps<'label'>;

export const TakeSelect: FC<Props> = ({ className, ...props }) => {
  const [value, setValue] = useSearchParamsSelect(
    'take',
    takeOptions,
    defaulTakeOption,
  );

  return (
    <label {...props} className={cn(classes.select, className)}>
      <Text.Small className={classes.select__text}>Items on page</Text.Small>

      <Select
        className={classes.select__control}
        value={value}
        onChange={setValue}
        options={takeOptions}
      />
    </label>
  );
};
