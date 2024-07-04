import React from 'react';
import ReactSelect, {
  Props as ReactSelectProps,
  components,
} from 'react-select';

import classes from './select.module.scss';
import classNames from 'classnames';
import { Text } from '../Text';

type Props<T> = Omit<ReactSelectProps<T>, 'classNames'>;

export const Select = <T,>({ className, defaultValue, ...props }: Props<T>) => {
  return (
    <ReactSelect
      {...props}
      isSearchable={false}
      classNames={{
        control: ({ isDisabled, menuIsOpen }) =>
          classNames(classes.select__control, {
            [classes.select__control_disabled]: isDisabled,
            [classes.select__control_open]: menuIsOpen,
          }),
        singleValue: () => classes.select__singleValue,
        option: ({ isSelected, isDisabled }) =>
          classNames(classes.select__option, {
            [classes.select__option_selected]: isSelected,
            [classes.select__option_disabled]: isDisabled,
          }),
        menu: () => classes.select__menu,
        menuList: () => classes.select__menuList,
        dropdownIndicator: () => classNames(classes.select__indicatorContainer),
        valueContainer: () => classes.select__valueContainer,
        indicatorSeparator: () => classes.select__separator,
      }}
      components={{
        Option: ({ children, ...rest }) => (
          <components.Option {...rest}>
            <Text>{children}</Text>
          </components.Option>
        ),
        SingleValue: ({ children, ...rest }) => (
          <components.SingleValue {...rest}>
            <Text.Button>{children}</Text.Button>
          </components.SingleValue>
        ),
      }}
      className={classNames(className, classes.select)}
    />
  );
};
