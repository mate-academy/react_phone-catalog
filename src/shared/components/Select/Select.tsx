import { useState } from 'react';

import cn from 'classnames';
import ReactSelect, {
  components,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  SingleValue,
} from 'react-select';

import DownIcon from '@assets/images/icons/chevron-down-icon.svg?react';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { DefaultProps } from '@shared/types/common';

import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends DefaultProps {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  defaultOption?: SelectOption;
  isDisabled?: boolean;
  onChange?: (value: SingleValue<SelectOption>) => void;
}

const CustomComponents = {
  IndicatorSeparator: () => null,
  DropdownIndicator: (
    props: DropdownIndicatorProps<SelectOption, false, GroupBase<SelectOption>>,
  ) => (
    <components.DropdownIndicator {...props}>
      <DownIcon
        className={cn(styles.dropdownIndicatorIcon, {
          [styles.open]: props.selectProps.menuIsOpen,
        })}
      />
    </components.DropdownIndicator>
  ),
};

const customClassNames = {
  control: (
    props: ControlProps<SelectOption, false, GroupBase<SelectOption>>,
  ) => cn(styles.control, { [styles.focused]: props.isFocused }),
  menu: () => styles.menu,
  option: (props: OptionProps<SelectOption, false, GroupBase<SelectOption>>) =>
    cn(styles.option, { [styles.focused]: props.isFocused }),
  singleValue: () => styles.singleValue,
};

export const Select: React.FC<SelectProps> = ({
  className,
  options,
  placeholder = 'Select',
  label,
  defaultOption = null,
  isDisabled = false,
  onChange,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    defaultOption,
  );

  const handleChange = (value: SingleValue<SelectOption>) => {
    if (onChange) {
      onChange(value);
    }

    setSelectedOption(value);
  };

  return (
    <Box className={cn(styles.select, className)}>
      <label>
        <Text variant="small" className={styles.label}>
          {label}
        </Text>

        <ReactSelect
          classNames={customClassNames}
          components={CustomComponents}
          defaultValue={selectedOption}
          options={options}
          placeholder={placeholder}
          onChange={handleChange}
          isDisabled={isDisabled}
          {...rest}
        />
      </label>
    </Box>
  );
};
