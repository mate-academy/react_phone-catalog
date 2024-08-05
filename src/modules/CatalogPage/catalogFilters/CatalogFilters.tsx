import React from 'react';
import styles from './CatalogFilters.module.scss';
import { useNavigate } from 'react-router-dom';
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
  { value: 'Newest', label: 'Newest' },
  { value: 'Alphabetically', label: 'Alphabetically' },
  { value: 'Cheapest', label: 'Cheapest' },
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
            ? 'icons/arrow-up-light-ico.svg'
            : 'icons/arrow-down-light-ico.svg'
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
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  page,
  perPage,
  sortBy,
  setSort,
  setPer,
}) => {
  const navigate = useNavigate();

  const models = useAppSelector(state => state.pagesDetails.models);

  const handleSortBySelect = (option: SingleValue<OptionsSortByType>) => {
    if (option) {
      const value = option.value;

      setSort(value);
      navigate(updateURLParams(value, perPage, page));
    }
  };

  const handleQuantitySelect = (option: SingleValue<OptionsQuantityType>) => {
    if (option) {
      const value = option.value;

      if (value.toUpperCase() === value.toLowerCase()) {
        setPer(value);
        navigate(updateURLParams(sortBy, value, page));
      } else {
        setPer(models.toString());
        navigate(updateURLParams(sortBy, models.toString(), page));
      }
    }
  };

  return (
    <div className={styles.filters}>
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
              border: '1px solid #B4BDC4',
              borderRadius: 0,
              height: '40px',
              width: '100%',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              color: '#313237',
              fontWeight: '700',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',

              boxShadow: state.isFocused ? '0 0 0 1px #313237' : 'none',

              '&:hover': {
                border: '1px solid #89939A',
              },

              '&:focus': {
                border: '1px solid #313237',
              },
            }),

            option: baseStyles => ({
              ...baseStyles,
              color: '#89939a',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: 'none',

              '&:hover': {
                color: '#313237',
              },
            }),

            menu: baseStyles => ({
              ...baseStyles,
              borderRadius: '0',
              border: '1px solid #E2E6E9',
              boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.05)',
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
              border: '1px solid #B4BDC4',
              borderRadius: 0,
              height: '40px',
              width: '100%',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              color: '#313237',
              fontWeight: '700',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',

              boxShadow: state.isFocused ? '0 0 0 1px #313237' : 'none',

              '&:hover': {
                border: '1px solid #89939A',
              },

              '&:focus': {
                border: '1px solid #313237',
              },
            }),

            option: baseStyles => ({
              ...baseStyles,
              color: '#89939a',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '21px',
              letterSpacing: '0%',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: 'none',

              '&:hover': {
                color: '#313237',
              },
            }),

            menu: baseStyles => ({
              ...baseStyles,
              borderRadius: '0',
              border: '1px solid #E2E6E9',
              boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.05)',
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