import './Dropdown.scss';
import {
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../context/GlobalContext';

type Props = {
  label: string;
  selected: string;
  options: string[];
  onChange: (value: string) => void;
};

export const Dropdown: FC<Props> = memo(
  ({ label, selected, options, onChange }) => {
    const { theme } = useContext(GlobalContext);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleButtonClick = useCallback(
      () => setIsOpen(prevState => !prevState),
      [],
    );

    const handleOptionClick = useCallback(
      (value: string) => {
        onChange(value);
        setIsOpen(false);
      },
      [onChange],
    );

    return (
      <div ref={dropdownRef} className="dropdown">
        <div className="dropdown__label">{label}</div>

        <button
          className={`dropdown__button ${isOpen ? 'dropdown__button--open' : ''}`}
          onClick={handleButtonClick}
        >
          <div className="dropdown__title">{selected}</div>
          <div className="dropdown__icon">
            <Icon
              icon={isOpen ? icons.arrow_down[theme] : icons.arrow_right[theme]}
            />
          </div>
        </button>

        {isOpen && (
          <ul className="dropdown__options">
            {options.map(option => (
              <li
                key={option}
                className="dropdown__option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
