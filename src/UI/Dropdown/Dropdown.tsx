/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaChevronDown } from 'react-icons/fa';
import React from 'react';
import * as Select from '@radix-ui/react-select';
import s from './Dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  defaultValue?: string;
  options: string[];
  dropdownWidth?: string | number;
  dropdownHeight?: string | number;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownSelectProps> = ({
  defaultValue,
  options,
  dropdownWidth = 'auto',
  dropdownHeight = 'auto',
  onChange,
}) => {

  const transformedOptions: DropdownOption[] = options.map(option => ({
    value: option,
    label: option,
  }));


  return (
    <Select.Root onValueChange={onChange}>
      {/* value={value} */}
      <Select.Trigger
        className={s.trigger}
        style={{
          width: dropdownWidth,
          height: dropdownHeight,
        }}
      >
        <Select.Value aria-label={defaultValue}>{defaultValue}</Select.Value>
        <Select.Icon className={s.indicator}>
        <FaChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.content}>
          <Select.Viewport>
            {transformedOptions.map(option => (
              <Select.Item
                className={s.item}
                key={option.value}
                value={option.value}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default Dropdown;
