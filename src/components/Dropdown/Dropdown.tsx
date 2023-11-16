import React from 'react';
import classNames from 'classnames';
import { Listbox } from '@headlessui/react';

import './Dropdown.scss';

type Props = {
  rootClassName: string,
  selectedItem: string | null,
  setSelectedItem?: React.Dispatch<React.SetStateAction<string | null>>,
  children: React.ReactNode,
  placeHolder?: string,
};

export const Dropdown: React.FC<Props> = React.memo(({
  rootClassName,
  selectedItem,
  setSelectedItem = () => {},
  children,
  placeHolder = '',
}) => {
  return (
    <div className={`${rootClassName}-dropdown`}>
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button
          className={classNames(
            `${rootClassName}-dropdown-button`,
            {
              [`${rootClassName}-dropdown-button--unselected`]: !selectedItem,
              [`${rootClassName}-dropdown-button--selected`]: selectedItem,
            },
          )}
        >
          {selectedItem || placeHolder}
        </Listbox.Button>

        <Listbox.Options className={`${rootClassName}-dropdown-list`}>
          {children}
        </Listbox.Options>
      </Listbox>
    </div>
  );
});
