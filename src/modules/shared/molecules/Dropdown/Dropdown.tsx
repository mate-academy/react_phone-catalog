import React, { useId } from 'react';
import { Typography } from '../../atoms/Typography';
import {
  components,
  SingleValueProps,
  ActionMeta,
  DropdownIndicatorProps,
  OptionProps,
} from 'react-select';
import { Icon } from '../../atoms/Icon';
import { ArrowIcon } from '../../../../assets/icons/arrow-icon';
import Select from 'react-select';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { DropdownOption } from '../../../../types/DropdownOption';

type Props = {
  label: string;
  options: DropdownOption[];
  value: DropdownOption | null;
  onChange: (
    newValue: DropdownOption | null,
    actionMeta: ActionMeta<DropdownOption>,
  ) => void;
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const id = useId();
  return (
    <div className={styles.component}>
      <Typography
        variant="label"
        tag="label"
        color="secondary"
        id={id}
        className={styles.component__label}
      >
        {label}
      </Typography>
      <div className={styles.component__field}>
        <Select
          aria-labelledby={id}
          className={styles.dropdown}
          classNames={{
            control: state =>
              classNames(styles.dropdown__control, {
                [styles['dropdown__control--is-focused']]: state.isFocused,
                [styles['dropdown__control--menu-is-open']]: state.menuIsOpen,
              }),
            singleValue: () => styles.dropdown__single_value,
            option: state =>
              classNames(styles.dropdownOption, {
                [styles['dropdown__option--is-focused']]: state.isFocused,
                [styles['dropdown__option--is-selected']]: state.isSelected,
              }),
            indicatorSeparator: () => styles.dropdown__indicator_separator,
            menu: () => styles.dropdown__menu,
          }}
          options={options}
          value={value}
          onChange={onChange}
          isSearchable={false}
          components={{
            SingleValue,
            DropdownIndicator,
            Option,
          }}
        />
      </div>
    </div>
  );
};

const SingleValue = (props: SingleValueProps<DropdownOption, false>) => (
  <components.SingleValue {...props}>
    <Typography variant="buttons">{props.children}</Typography>
  </components.SingleValue>
);

const DropdownIndicator = (
  props: DropdownIndicatorProps<DropdownOption, false>,
) => {
  const {
    selectProps: { menuIsOpen },
  } = props;

  return (
    <components.DropdownIndicator {...props}>
      <Icon color="secondary" direction={menuIsOpen ? 'up' : 'down'}>
        <ArrowIcon />
      </Icon>
    </components.DropdownIndicator>
  );
};

const Option = (props: OptionProps<DropdownOption, false>) => {
  return (
    <components.Option {...props}>
      <Typography variant="buttons">{props.data.label}</Typography>
    </components.Option>
  );
};
