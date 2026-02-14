import { useState } from 'react';
import { Icon } from '../../../../components/Icon';
import styles from './Dropdown.module.scss';
import cn from 'classnames';
import { useAppSelector } from '../../../../store/hooks';

type Props = {
  options: { [key: string]: string };
  value: string;
  setOption: (o: string) => void;
};

export const Dropdown: React.FC<Props> = ({ options, value, setOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useAppSelector(state => state.theme);

  const toggleList = () => {
    setIsOpen(curState => !curState);
  };

  return (
    <div
      className={cn(styles.dropdown, {
        [styles['dropdown--active']]: isOpen,
        [styles['dropdown--dark']]: isDark,
      })}
    >
      <button
        type="button"
        className={styles.dropdown__btn}
        onClick={toggleList}
      >
        {value}

        {isOpen ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />}
      </button>

      <ul className={styles.dropdown__content}>
        {Object.entries(options).map(([option, label]) => (
          <li
            className={cn(`${styles.dropdown__option}`, {
              [styles['dropdown__option--active']]: value === label,
            })}
            key={option}
            onClick={() => {
              toggleList();
              setOption(option);
            }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
