/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef, useEffect } from 'react';
import '../../styles/components/Dropdown/Dropdown.scss';
import classNames from 'classnames';

type Props = {
  options: string[];
  selected: string | null;
  title: string;
  onClick: (option: string) => void;
};

export const Dropdown: React.FC<Props> = ({
  options,
  selected,
  title,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const handleDropdownOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleClick = (input: string) => {
    setIsOpen(false);
    onClick(input);
  };

  return (
    <div
      className="dropdown"
      ref={rootRef}
    >
      <p className="dropdown__title">
        {title}
      </p>

      <div
        className={classNames('dropdown__visible', {
          'is-visible': isOpen,
        })}
        onClick={handleDropdownOpen}
      >
        <p className="dropdown__selected">{selected}</p>

        <span className="dropdown__icon" />
      </div>

      <ul className={classNames('dropdown__list', {
        'is-visible': isOpen,
      })}
      >
        {options.map(option => (
          <li
            key={option}
            className="dropdown__option"
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
