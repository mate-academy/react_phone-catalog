/* eslint-disable import/no-extraneous-dependencies */
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import styles from './SortSelect.module.scss';

type Props = {
  sort: string;
  handleSortChange: (value: string) => void;
};

export const SortSelect: React.FC<Props> = ({ sort, handleSortChange }) => {
  const options = [
    { value: 'year', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const selected = options.find(option => option.value === sort) || options[0];

  return (
    <div className={styles.dropdown}>
      <label className={styles['dropdown__sort-name']} htmlFor="sort">
        Sort by
      </label>

      <Listbox
        value={selected}
        onChange={option => handleSortChange(option.value)}
      >
        <ListboxButton
          id="sort"
          name="sort"
          className={styles['dropdown__sort-select']}
        >
          {selected.label}
        </ListboxButton>
        <ListboxOptions className={styles['dropdown__sort-options']}>
          {options.map(option => (
            <ListboxOption
              key={option.value}
              value={option}
              className={styles['dropdown__sort-option']}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
