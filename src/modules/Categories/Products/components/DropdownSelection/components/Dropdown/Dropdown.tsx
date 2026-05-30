import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { SearchContext } from '../../../../../../../context/SearchContext';
import DSStyles from '../../DropdownSelection.module.scss';
import dropdownSCSSStyles from './Dropdown.module.scss';
import { Props } from './types/Props';

export const Dropdown: React.FC<Props> = ({
  searchParamStr,
  isFocused,
  enumValues,
  searchParam,
  buttonValue,
  setFocusHandler,
}) => {
  const { getSearchWith } = useContext(SearchContext);

  const dropdownStyles: React.CSSProperties = {
    transform: 'scaleY(1)',
    opacity: 1,
    pointerEvents: 'all',
  };

  return (
    <div
      className={dropdownSCSSStyles.dropdown}
      style={isFocused ? dropdownStyles : {}}
    >
      {enumValues.map(value => {
        // #region variables

        const searchValue = value.toLowerCase().replace(' ', '-');

        const linkClass = classNames(
          DSStyles.link,
          dropdownSCSSStyles['dropdown-link'],
          {
            [dropdownSCSSStyles.active]: value === buttonValue,
          },
        );

        const onClickHandler =
          searchValue === searchParam ? () => {} : setFocusHandler;

        // #endregion

        return (
          <Link
            className={linkClass}
            key={value}
            onClick={onClickHandler}
            to={{
              search: getSearchWith({ [searchParamStr]: searchValue }),
            }}
          >
            {value}
          </Link>
        );
      })}
    </div>
  );
};
