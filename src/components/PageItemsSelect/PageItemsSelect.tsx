/* eslint-disable import/no-extraneous-dependencies */
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import React from 'react';
import styles from './PageItemsSelect.module.scss';

type Props = {
  perPage: string;
  handlePerPageChange: (value: string) => void;
};

export const PageItemsSelect: React.FC<Props> = ({
  perPage,
  handlePerPageChange,
}) => {
  const options = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  const selected = perPage
    ? options.find(option => option.label === perPage) || options[3]
    : options[3];

  return (
    <div className={styles.dropdown}>
      <label
        className={styles['dropdown__page-items-name']}
        htmlFor="page-items"
      >
        Items on page
      </label>

      <Listbox value={selected} onChange={e => handlePerPageChange(e.value)}>
        <ListboxButton
          id="page-items"
          name="page-items"
          className={styles['dropdown__page-items-select']}
        >
          {selected.label}
        </ListboxButton>
        <ListboxOptions className={styles['dropdown__page-items-options']}>
          {options.map(option => (
            <ListboxOption
              key={option.value}
              value={option}
              className={styles['dropdown__page-items-option']}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
