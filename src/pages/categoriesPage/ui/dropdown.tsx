import styles from '../styles/dropdownItem.module.scss';
import { ArrowIcon } from '@shared/icons';
import classNames from 'classnames';
import { useDropdown, apiToUIMap, DropdownProps } from '../model';

type Props<T> = {
  data: DropdownProps;
  setFilter: (param: T) => void;
  active: string;
};

export const Dropdown = <T,>({ data, setFilter, active }: Props<T>) => {
  const { title, names, defaultLabel } = data;
  const { isOpen, button, onButton, onOption, dropdown } = useDropdown({
    setFilter,
  });

  return (
    <div className={styles.container} aria-label="Catalogue filter">
      <span className={styles.title}>{title}</span>
      <button
        ref={button}
        onClick={onButton}
        className={styles.button}
        aria-expanded={isOpen}
      >
        {apiToUIMap.get(active) || defaultLabel}
        <ArrowIcon direction={isOpen ? null : 'down'} />
      </button>
      <ul
        style={isOpen ? { display: 'flex' } : { display: 'none' }}
        className={styles.options}
        role="listbox"
        ref={dropdown}
      >
        {names.map(el => (
          <li
            key={el}
            role="option"
            className={classNames(styles.options__item, {
              [styles.options__item__active]: el === apiToUIMap.get(active),
            })}
            onClick={() => onOption(el)}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
