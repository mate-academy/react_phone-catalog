import styles from '../styles/dropdownItem.module.scss';
import { ArrowIcon } from '@shared/icons';
import { useRef, useState } from 'react';
import { DropdownProps } from '../model/dropdownConfig';

type Props = {
  data: DropdownProps;
};

export const Dropdown = ({ data }: Props) => {
  const { title, values } = data;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const button = useRef(null);
  const activeIndex = useRef(0);

  return (
    <div className={styles.container} aria-label="Catalogue filter">
      <span className={styles.title}>{title}</span>
      <button
        id={'sort'}
        ref={button}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
      >
        {values[0].name}
        <ArrowIcon direction={isOpen ? null : 'down'} />
      </button>
      <ul
        style={isOpen ? { display: 'flex' } : { display: 'none' }}
        className={styles.options}
        role="listbox"
      >
        {values.map(el => (
          <li
            key={el.name}
            role="option"
            className={styles.options__item}
            onClick={() => (activeIndex.current = values.indexOf(el))}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
