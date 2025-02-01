/*import { useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { DropdownItem } from '../../../../_types/dropDown';
import { SearchLink } from '../../../shared/components/SearchLink';

type Props = {
  description: string;
  items: DropdownItem[];
  value: DropdownItem;
  onSelect: (item: DropdownItem) => void;
};

const Dropdown: React.FC<Props> = ({ description, items, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: DropdownItem) => {
    onSelect(item);
    setIsOpen(false);
  };

  const handlToggelClick = () => setIsOpen(prev => !prev);

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__description}>{description}</div>
      <div
        className={styles.dropdown__content}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
      >
        <div
          className={classNames(styles.dropdown__header, {
            [styles['dropdown__header--focus']]: isOpen,
          })}
          onClick={handlToggelClick}
        >
          <div className={styles.dropdown__value}>{value.label}</div>
          <button
            className={classNames(styles.dropdown__icon, {
              [styles['dropdown__icon--rotated']]: isOpen,
            })}
          ></button>
        </div>
        {isOpen && (
          <ul className={styles.dropdown__list}>
            {items.map(item => (
              <li
                key={item.label}
                className={styles.dropdown__item}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
*/
