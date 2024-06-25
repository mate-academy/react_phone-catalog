/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Select } from '../../../shared/ui/Select';
import { Container } from '../../../shared/Container';
import { Text } from '../../../shared/ui/Text';
import { SORT_SELECT_OPTIONS, TAKE_SELECT_OPTIONS } from '../../variables';
import { useSortQuery } from '../../hooks/useSortQuery';
import { useTakeQuery } from '../../hooks/useTakeQuery';
import classes from './selects.module.scss';

type Props = ComponentPropsWithoutRef<typeof Container.Grid> & {};

export const Selects: FC<Props> = ({ className, ...props }) => {
  const [sortOption, setSortOption] = useSortQuery();
  const [takeOption, setTakeOption] = useTakeQuery();

  return (
    <Container.Grid {...props} className={cn(classes.selects, className)}>
      <label
        className={cn(classes.selects__select, classes.selects__select_sort)}
      >
        <Text.Small className={classes.selects__text}>Sort</Text.Small>

        <Select
          onChange={setSortOption}
          value={sortOption}
          options={SORT_SELECT_OPTIONS}
          className={classes.selects__selectControl}
        />
      </label>
      <label
        className={cn(classes.selects__select, classes.selects__select_take)}
      >
        <Text.Small className={classes.selects__text}>Items on page</Text.Small>

        <Select
          onChange={setTakeOption}
          value={takeOption}
          options={TAKE_SELECT_OPTIONS}
          className={classes.selects__selectControl}
        />
      </label>
    </Container.Grid>
  );
};
