import classNames from 'classnames';
import {
  FC,
  // useEffect,
  useState,
} from 'react';

import './Dropdown.scss';

type Props = {
  title: string;
  selectedValue: string;
  options: string[][];
  onSelect: (value: string) => void;
  defaultOption: string;
};

export const DropdownSelect: FC<Props> = ({
  title,
  selectedValue,
  options,
  onSelect,
  defaultOption,
}) => {
  const handleCurrentValue = () => {
    const optionValue = options.find(
      ([, value]) => value === selectedValue,
    ) || [];

    if (!optionValue.length) {
      return defaultOption;
    }

    const [key, value] = optionValue;

    return (Number.isNaN(+value) ? key : value);
  };

  const [isShown, setIsShown] = useState(false);

  const handleClick = (value: string) => {
    onSelect(value);

    setIsShown(prevState => !prevState);
  };

  const handleBlur = () => {
    if (isShown) {
      setTimeout(() => {
        setIsShown(false);
      }, 200);
    }
  };

  // useEffect(() => {
  //   handleCurrentValue();
  // }, [selectedValue]);

  return (
    <div
      className="selectors__dropdown selector"
    >
      <p
        className="selector__selector-label selectors__label"
      >
        {title}
      </p>

      <button
        type="button"
        className={classNames(
          'selector__container',
          'selector__selector-container',
          { opened: isShown },
        )}
        tabIndex={0}
        onClick={() => setIsShown(prevState => !prevState)}
        onBlur={handleBlur}
      >
        {handleCurrentValue()}
      </button>

      <ul
        className={classNames(
          'selector__container',
          'selector__options-container',
          { show: isShown },
        )}
      >
        {options.map(([key, value]) => (
          <li
            key={key}
          >
            <button
              type="button"
              className="selector__container selector__option"
              onClick={() => {
                handleClick(value);
              }}
            >
              {Number.isNaN(+value) ? key : value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
