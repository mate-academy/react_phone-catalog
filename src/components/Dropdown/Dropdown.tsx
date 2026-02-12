import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { ReactNode } from 'react';

interface DropdownProps<T extends ReactNode> {
  label: string;
  menuItems: T[];
  activeItem: string;
  onClick: (item: T) => void;
}

export const Dropdown = <T extends ReactNode>({
  label,
  menuItems,
  activeItem,
  onClick,
}: DropdownProps<T>) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  // const handleMenuButtonClick = (item: T) => {
  //   onClick(item);

  //   const itemString = item?.toString() || '';

  //   searchParams.set(urlParam, itemString);
  //   setSearchParams(searchParams);
  // };

  return (
    <Menu as="div" className={styles.dropdown}>
      {({ open }) => (
        <>
          <p className={styles.dropdown__label}>{label}</p>

          <MenuButton
            className={classNames(styles.dropdown__button, {
              [styles.dropdown__buttonActive]: open,
            })}
            id="menuButton"
            ref={buttonRef}
          >
            {activeItem}
          </MenuButton>

          <MenuItems
            anchor="bottom"
            as="div"
            className={styles.dropdown__itemsList}
            style={{ width }}
          >
            {menuItems.map(item => (
              <MenuItem
                as="button"
                className={classNames(styles.dropdown__item, {
                  [styles.dropdown__itemActive]: activeItem === item,
                })}
                key={item as React.Key}
                onClick={() => onClick(item)}
              >
                {item}
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  );
};
