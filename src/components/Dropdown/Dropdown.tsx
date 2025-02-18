import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';

export const Dropdown = () => {
  const placeholder = 'Choose';

  return (
    <Menu as="div" className={styles.dropdown}>
      {({ open }) => (
        <>
          <MenuButton
            className={classNames(styles.dropdown__button, {
              [styles.dropdown__buttonActive]: open,
            })}
          >
            {placeholder}
          </MenuButton>

          <MenuItems as="div" className={styles.dropdown__itemsList}>
            <MenuItem as="button" className={styles.dropdown__item}>
              1
            </MenuItem>
            <MenuItem as="button" className={styles.dropdown__item}>
              2
            </MenuItem>
            <MenuItem as="button" className={styles.dropdown__item}>
              3
            </MenuItem>
            <MenuItem as="button" className={styles.dropdown__item}>
              4
            </MenuItem>
          </MenuItems>
        </>
      )}
    </Menu>
  );
};
