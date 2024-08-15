import React, { useEffect } from 'react';
import styles from './CatalogFilters.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updateURLParams } from './../services/updateUrl';
import Select, { components, SingleValue } from 'react-select';
import { useAppSelector } from '../../../app/hooks';

interface OptionsSortByType {
  value: string;
  label: string;
}

interface OptionsQuantityType {
  value: string;
  label: string;
}

const optionsSortBy: OptionsSortByType[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];
const optionsQuantity: OptionsQuantityType[] = [
  { value: 'all', label: 'all' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <img
        src={
          props.selectProps.menuIsOpen
            ? './icons/arrow-up-light-ico.svg'
            : './icons/arrow-down-light-ico.svg'
        }
        alt="dropdown-indicator"
        style={{ width: '16px', height: '16px' }}
      />
    </components.DropdownIndicator>
  );
};

interface CatalogFiltersProps {
  page: number;
  perPage: string;
  sortBy: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setPer: React.Dispatch<React.SetStateAction<string>>;
  setPagePage: React.Dispatch<React.SetStateAction<number>>;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  page,
  perPage,
  sortBy,
  setSort,
  setPer,
  setPagePage,
}) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const isDark = useAppSelector(state => state.boolean.isDark);

  useEffect(() => {
    const filters = document.getElementById('filtersId');

    if (isDark) {
      filters?.style.setProperty('--secondary-grey-color', '#75767f');
      filters?.style.setProperty('--dark-black-color', '#0f1121');
      filters?.style.setProperty('--dark-surface-2-color', '#323542');
      filters?.style.setProperty('--icons-grey-color', '#323542');
      filters?.style.setProperty('--dark-icons-color', '#4a4d58');
      filters?.style.setProperty('--dark-accent-color', '#905bff');
      filters?.style.setProperty('--dropdown-option-hover-color', '#323542');
    } else {
      filters?.style.setProperty('--secondary-grey-color', '#89939a');
      filters?.style.setProperty('--dark-black-color', '#ffffff');
      filters?.style.setProperty('--dark-surface-2-color', '#ffffff');
      filters?.style.setProperty('--icons-grey-color', '#b4bdc4');
      filters?.style.setProperty('--dark-icons-color', '#89939a');
      filters?.style.setProperty('--dark-accent-color', '#313237');
      filters?.style.setProperty('--dropdown-option-hover-color', '#fafbfc');
    }
  }, [isDark]);

  const handleSortBySelect = (option: SingleValue<OptionsSortByType>) => {
    if (option) {
      const valueSortBy = option.value;

      setSort(valueSortBy);
      if (perPage.toUpperCase() === perPage.toLowerCase()) {
        navigate(updateURLParams(valueSortBy, perPage, page, query));
      } else {
        navigate(updateURLParams(valueSortBy, 'all', page, query));
      }
    }
  };

  const handleQuantitySelect = (option: SingleValue<OptionsQuantityType>) => {
    if (option) {
      const valuePerPage = option.value;

      if (valuePerPage.toUpperCase() === valuePerPage.toLowerCase()) {
        setPer(valuePerPage);
        navigate(updateURLParams(sortBy, valuePerPage, page, query));
      } else {
        setPer('all');
        setPagePage(1);
        navigate(updateURLParams(sortBy, 'all', 1, query));
      }
    }
  };

  return (
    <div id="filtersId" className={styles.filters}>
      <div
        className={`${styles.filters__block} ${styles.filters__blockSortBy}`}
      >
        <p className={styles.filters__text}>Sort by</p>

        <Select
          onChange={handleSortBySelect}
          options={optionsSortBy}
          defaultValue={optionsSortBy[0]}
          value={optionsSortBy.find(option => option.value === sortBy)}
          components={{ DropdownIndicator }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: '1px solid var(--icons-grey-color)',
              borderRadius: 0,
              height: '40px',
              width: '100%',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              color: 'var(--primary-grey-color)',
              fontWeight: '700',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: 'var(--dark-surface-2-color)',
              boxShadow: state.isFocused
                ? '0 0 0 1px var(--dark-accent-color)'
                : 'none',

              '&:hover': {
                border: '1px solid var(--dark-icons-color)',
              },

              '&:focus': {
                border: '1px solid var(--dark-accent-color)',
              },
            }),

            singleValue: baseStyles => ({
              ...baseStyles,
              color: 'var(--primary-grey-color)',
            }),

            option: baseStyles => ({
              ...baseStyles,
              color: 'var(--secondary-grey-color)',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: 'none',

              '&:hover': {
                backgroundColor: 'var(--dropdown-option-hover-color)',
                color: 'var(--primary-grey-color)',
              },
            }),

            menu: baseStyles => ({
              ...baseStyles,
              borderRadius: '0',
              border: '1px solid var(--elements-grey-color)',
              boxShadow: '0px 2px 15px 0px var(--dwop-down-shadow)',
              backgroundColor: 'var(--dark-black-color)',
            }),

            indicatorSeparator: () => ({
              display: 'none',
            }),
          }}
        />
      </div>

      <div
        className={`${styles.filters__block} ${styles.filters__blockQuantity}`}
      >
        <p className={styles.filters__text}>Items on page</p>

        <Select
          onChange={handleQuantitySelect}
          options={optionsQuantity}
          defaultValue={optionsQuantity[0]}
          value={optionsQuantity.find(option => option.value === perPage)}
          components={{ DropdownIndicator }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: '1px solid var(--icons-grey-color)',
              borderRadius: 0,
              height: '40px',
              width: '100%',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '700',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: 'var(--dark-surface-2-color)',
              boxShadow: state.isFocused
                ? '0 0 0 1px var(--dark-accent-color)'
                : 'none',

              '&:hover': {
                border: '1px solid var(--dark-icons-color)',
              },

              '&:focus': {
                border: '1px solid var(--dark-accent-color)',
              },
            }),

            singleValue: baseStyles => ({
              ...baseStyles,
              color: 'var(--primary-grey-color)',
            }),

            option: baseStyles => ({
              ...baseStyles,
              color: 'var(--secondary-grey-color)',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: 'none',

              '&:hover': {
                backgroundColor: 'var(--dropdown-option-hover-color)',
                color: 'var(--primary-grey-color)',
              },
            }),

            menu: baseStyles => ({
              ...baseStyles,
              borderRadius: '0',
              border: '1px solid var(--elements-grey-color)',
              boxShadow: '0px 2px 15px 0px var(--dwop-down-shadow)',
              backgroundColor: 'var(--dark-black-color)',
            }),

            indicatorSeparator: () => ({
              display: 'none',
            }),
          }}
        />
      </div>
    </div>
  );
};
