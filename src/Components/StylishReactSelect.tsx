/* eslint-disable max-len */
import classNames from 'classnames';
import Select, { ClassNamesConfig, StylesConfig } from 'react-select';
import { typographyStyle } from '../CustomStyles/Typography';

type Props = {
  className: string;
  options: unknown[];
  value: unknown;
  onChange: (e: unknown) => void;
};

const customClasses: ClassNamesConfig = {
  menu: () => 'rounded-none',
  menuList: () => `text-Secondary border py-2 border-Elements bg-white ${typographyStyle.bodyText}`,
  control: () => 'rounded-none border border-Icons px-3 py-0 shadow-none focus-within:border-Primary hover:border-Secondary',
  option: state => classNames(
    'flex h-8 items-center px-3 py-0 hover:bg-Background hover:text-Primary',
    {
      'bg-Background text-Primary': state.isSelected,
    },
  ),
  dropdownIndicator: state => classNames('transition-all', {
    'rotate-180': state.selectProps.menuIsOpen,
  }),
};

const customStyles: StylesConfig = {
  option: state => ({
    ...state,
    display: 'flex',
  }),
};

export const StylishReactSelect: React.FC<Props> = ({
  className,
  options,
  value,
  onChange,
}) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      isSearchable={false}
      unstyled
      styles={customStyles}
      aria-labelledby="aria-label"
      inputId="aria-example-input"
      className={className}
      classNames={customClasses}
    />
  );
};
