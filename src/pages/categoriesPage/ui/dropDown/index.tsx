import { useDropdown } from '../../model';
import styles from '../../styles/dropdownItem.module.scss';
import { ArrowIcon } from '@shared/icons';
import { Titles } from '../../types/types';

type Props = {
  title: Titles;
};

export const DropdownButton = ({ title }: Props) => {
  const { isOpen, handleToggle, button, list, handleSelect, current, listRef } =
    useDropdown({ title });

  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <button
        id={'sort'}
        ref={button}
        onClick={handleToggle}
        className={styles.button}
      >
        {current}
        <ArrowIcon direction={isOpen ? null : 'down'} />
      </button>
      <ul
        style={isOpen ? { display: 'flex' } : { display: 'none' }}
        className={styles.options}
        ref={listRef}
        role="listbox"
      >
        {list.map(item => (
          <li
            key={item}
            role="option"
            className={styles.options__item}
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
