import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';
import './Dropdown.scss';

type Props = {
  dropdownItems: string[];
  dropdownLabel: string;
  id: string;
};

const Dropdown: React.FC<Props> = ({ dropdownItems, dropdownLabel, id }) => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const urlSearchParam = new URLSearchParams(location.search);

  const pushSearchParam = (searchQuery: string) => {
    urlSearchParam.set(`${id}Query`, searchQuery);

    history.push({
      search: urlSearchParam.toString(),
    });
  };

  // useEffect(() => {
  //   if (urlSearchParam.get(`${id}Query`)) {
  //     urlSearchParam.set(`${id}Query`, `${urlSearchParam.get(`${id}Query`)}`);
  //   } else {
  //     urlSearchParam.set(`${id}Query`, `${dropdownItems[0]}`);
  //   }
  //
  //   history.push({
  //     search: urlSearchParam.toString(),
  //   });
  // }, [location.search]);

  return (
    <div className="dropdown">
      <div className="dropdown__description">
        {dropdownLabel}
      </div>
      <input
        type="checkbox"
        checked={isChecked}
        id={dropdownLabel}
        className="dropdown__checkbox"
        onChange={() => setChecked(!isChecked)}
      />
      <label
        htmlFor={dropdownLabel}
        className={cn(
          'dropdown__label',
          { dropdown__label_checked: isChecked },
        )}
      >
        {urlSearchParam.get(`${id}Query`)
          ? urlSearchParam.get(`${id}Query`)
          : dropdownItems[0]}
      </label>
      <ul
        className={cn(
          'dropdown__body',
          { dropdown__body_checked: isChecked },
        )}
      >
        {dropdownItems.map(selector => (
          <li
            key={selector}
            className="dropdown__item"
          >
            <button
              type="button"
              className="dropdown__button"
              onClick={() => {
                setChecked(false);
                pushSearchParam(selector);
              }}
            >
              {selector}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
