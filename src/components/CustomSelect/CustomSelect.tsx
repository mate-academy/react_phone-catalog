import classNames from 'classnames';
import {
  useState,
  useEffect,
} from 'react';
import './CustomSelect.scss';

type Props = {
  optionsList: string[];
  default: string;
  size: string;
  filterBy: (value: string) => void;
};

export const CustomSelect: React.FC<Props> = (props) => {
  const def = props.default;
  const width = props.size;
  const { optionsList, filterBy } = props;

  const [defaultText, setDefaultText] = useState(def);
  const [showOptionList, setShowOptinList] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    const element = (e.target as HTMLElement);

    if (!element.closest('.CustomSelect')) {
      setShowOptinList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    setDefaultText(def);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    setShowOptinList(!showOptionList);
  };

  const handleOptionClick = (
    value: string,
  ) => {
    setDefaultText(value);
    filterBy(value);
    setShowOptinList(false);
  };

  return (
    <div
      className={classNames(
        'CustomSelect',
        { 'CustomSelect--active': showOptionList },
      )}
      onClick={handleListDisplay}
      style={{ width }}
      role="button"
      tabIndex={0}
      aria-hidden="true"
    >
      <div>
        {defaultText}
      </div>
      {showOptionList && (
        <ul
          className="CustomSelect__options"
          style={{ width }}
        >
          {optionsList.map(option => {
            return (
              <li
                className="CustomSelect__option"
                key={option}
                onClick={() => handleOptionClick(option)}
                aria-hidden="true"
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
