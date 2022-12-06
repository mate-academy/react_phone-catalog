import { FC, useState } from 'react';
import classNames from 'classnames';

type Option = {
  title: string, value: string,
};

type Props = {
  title: string;
  options: Option[];
  action: (value: string) => void;
  defaultValue: string;
};
export const Select: FC<Props> = (
  {
    options, action, defaultValue, title,
  },
) => {
  const initialValue = options
    .find(option => option.value === defaultValue) || options[0];
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(initialValue);

  const styles = {
    width: '176px',
  };

  const handleSelect = () => {
    setIsOpen(current => !current);
  };

  const setOption = (option: Option) => {
    setIsSelected(option);
    setIsOpen(false);
    action(option.value);
  };

  return (
    <div className="select" style={styles}>
      <span className="select__title">{title}</span>
      <div
        role="menuitem"
        tabIndex={0}
        className={classNames(
          'select__selected-value',
          { 'select__selected-value--focus': isOpen },
        )}
        onClick={handleSelect}
        onKeyDown={handleSelect}
      >
        {isSelected.title}
      </div>
      {isOpen && (
        <ul className="select__options" style={styles}>
          {options.map(option => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <li
              key={option.value}
              className="select__option"
              onClick={() => setOption(option)}
              onKeyDown={() => setOption(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
