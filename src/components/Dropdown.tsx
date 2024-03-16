/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';

type Props = {
  toggleDropdown: () => void;
  selectedValue: string;
  handleOptionClick: (value: string) => void;
  options: string[];
  isOpen: boolean;
};

export const Dropdown: React.FC<Props> = ({
  toggleDropdown,
  selectedValue,
  handleOptionClick,
  options,
  isOpen,
}) => {
  return (
    <div className="dropdown dropdown--big">
      <div onClick={toggleDropdown} className="dropbtn">
        {selectedValue}
        <div
          className={cn('icon icon--slider icon--down dropdown__icon', {
            'icon--up': isOpen,
          })}
        />
      </div>
      <div
        id="dropdownContent"
        className={cn('dropdown-content', { show: isOpen })}
      >
        {options.map((option: string) => (
          <div
            key={option}
            onClick={() => handleOptionClick(option)}
            className="option"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
