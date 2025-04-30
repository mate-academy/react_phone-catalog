import { useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { DropdownItem } from '../../../../_types/dropDown';
import { SearchLink } from '../../../shared/components/SearchLink';

type Props = {
  description: string;
  options: DropdownItem[];
  selectedOption: string;
};

const Dropdown: React.FC<Props> = ({
  description,
  options,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggelClick = () => setIsOpen(prev => !prev);

  function getLabelBySortValue(value: string) {
    const option = options.find(item => item.value === value);

    return option ? option.label : '';
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__description}>{description}</div>
      <div
        className={styles.dropdown__content}
        tabIndex={0}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      >
        <div
          className={classNames(styles.dropdown__header, {
            [styles['dropdown__header--focus']]: isOpen,
          })}
          onClick={handleToggelClick}
        >
          <div className={styles.dropdown__value}>
            {getLabelBySortValue(selectedOption)}
          </div>
          <button
            className={classNames(styles.dropdown__icon, {
              [styles['dropdown__icon--rotated']]: isOpen,
            })}
          ></button>
        </div>
        {isOpen && (
          <ul className={styles.dropdown__select}>
            {options.map(option => (
              <li key={option.label} onClick={() => handleClose()}>
                <SearchLink
                  params={option.params}
                  className={styles.dropdown__option}
                >
                  {option.label}
                </SearchLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
