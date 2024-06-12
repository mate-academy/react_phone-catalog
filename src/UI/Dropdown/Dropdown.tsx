import { Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu';

import { FC } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Option from '../../types/Options';
import classNames from 'classnames';
import styles from './Dropdown.module.css';

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
  options: Option[];
  sortOption: string;
}

const Dropdown: FC<Props> = ({
  defaultValue,
  onChange,
  options,
  sortOption,
}) => (
  <Root>
    <Trigger className={styles.DropdownMenuTrigger}>
      <div>{defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1)}</div>
      <div className={styles.DropdownMenuTriggerIcon}>
        <IoIosArrowDown size={16} />
      </div>
    </Trigger>
    <Content className={styles.DropdownMenuContent} side="bottom">
      {options.map(option => (
        <Item
          key={option.value}
          onSelect={() => onChange(option.value)}
          className={classNames(styles.DropdownMenuItem, {
            [styles.DropdownMenuItemActive]: sortOption === option.value,
          })}
        >
          {option.label}
        </Item>
      ))}
    </Content>
  </Root>
);

export default Dropdown;
