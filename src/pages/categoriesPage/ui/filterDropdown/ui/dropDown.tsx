import classNames from 'classnames';
import { useDropdown } from '../model/useDropdown';
import styles from '../styles/dropdown.module.scss';
import { DropdownItem } from '../types';
import { IconCSSPath } from '@shared/types/iconsEnum';

type Props<T> = {
  items: DropdownItem[];
  content: string;
  fn: (arg: T) => void;
};

export const DropDown = <T,>({ items, content, fn }: Props<T>) => {
  const { isActive, activeIndex, handleToggle, handleItemSelect, button } =
    useDropdown();

  return (
    <button
      role="button"
      className={classNames(styles.dropDown, {
        [styles['dropDown--active']]: isActive === true,
      })}
      onClick={() => handleToggle()}
      ref={button}
      style={
        {
          '--content': `"${content}"`,
          '--icon': IconCSSPath.Down,
        } as React.CSSProperties
      }
    >
      {items[activeIndex].value}

      {isActive && (
        <ul className={styles.dropDown__list} role="listbox">
          {items.map((item: DropdownItem) => (
            <li
              key={item.id}
              role="option"
              className={classNames(styles.dropDown__item, {
                [styles['dropDown__item--active']]: item.id === activeIndex,
              })}
              aria-selected={item.id === activeIndex}
              onClick={(event: React.MouseEvent) => {
                handleItemSelect(event, item.id);
                fn(item.value as T);
              }}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};
