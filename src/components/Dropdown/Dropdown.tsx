import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export const Dropdown = () => {
  const placeholder = 'Choose';
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <Menu as="div" className={styles.dropdown}>
      {({ open }) => (
        <>
          <MenuButton
            className={classNames(styles.dropdown__button, {
              [styles.dropdown__buttonActive]: open,
            })}
            ref={buttonRef}
          >
            {placeholder}
          </MenuButton>

          <MenuItems
            anchor="bottom"
            as="div"
            className={styles.dropdown__itemsList}
            style={{ width }}
          >
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
