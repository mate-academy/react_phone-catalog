import * as R from 'react';
import isEqual from 'lodash.isequal';
import cn from 'classnames';

import './Dropdown.scss';
import { TyMouseEvtButtonElmt } from '../../types/General';

export type TyDropdownOption = {
  value: string,
  content: string,
};

type Props = {
  selectedValue: string,
  options: TyDropdownOption[],
  onChange: (value: string)=> void;
};
/* eslint no-console: "warn" */
export const Dropdown: R.FC<Props> = R.memo(
  ({
    selectedValue,
    options,
    onChange = () => {},
  }) => {
    console.info('render');
    const [expanded, setExpanded] = R.useState(false);
    const selectedOption = options.find(o => o.value === selectedValue);

    const handleExpandChange = (event: TyMouseEvtButtonElmt) => {
      event.preventDefault();
      event.stopPropagation();
      setExpanded(prev => !prev);
    };

    return (
      <div className="Dropdown Dropdown__container">
        <div className="Dropdown__trigger">
          <button
            type="button"
            aria-label="dropdown-menu"
            className="Dropdown__button Dropdown__button-trigger"
            onClick={handleExpandChange}
          >
            <span>{selectedOption?.content}</span>

            <span className={cn('Dropdown__icon', {
              'Dropdown__icon--active': expanded,
            })}
            >
              <i className="icon icon--arrow-down" />
            </span>
          </button>
        </div>

        <div className={cn('Dropdown__menu', {
          'Dropdown__menu--hidden': !expanded,
        })}
        >
          <ul className="Dropdown__content">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                className={cn('Dropdown__button',
                  'Dropdown__button-option', {
                    'Dropdown__button-option--default':
                selectedValue !== option.value,
                    'Dropdown__button-option--selectedValue':
                selectedValue === option.value,
                  })}
                onClick={() => {
                  onChange(option.value);
                  setExpanded(false);
                }}
              >
                {option.content}
              </button>
            ))}
          </ul>
        </div>
      </div>
    );
  },
  isEqual,
);
