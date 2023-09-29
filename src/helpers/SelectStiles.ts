import {
  CSSObjectWithLabel,
  ControlProps,
  DropdownIndicatorProps,
  OptionProps,
  StylesConfig,
} from 'react-select';

export const select: StylesConfig = {
  control: (provided: CSSObjectWithLabel, state: ControlProps) => ({
    ...provided,
    width: '100%',
    height: '40px',
    border: `1px solid ${state.isFocused ? '#313237' : '#B4BDC3'}`,
    backgroundColor: 'transparent',
    padding: '10px 12px',
    fontFamily: 'Mont',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '21px',
    color: '#B4BDC3',
    cursor: 'pointer',
  }),
  option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
    ...provided,
    fontFamily: 'Mont',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '21px',
    color: '#89939A',
    width: '100%',
    height: '40px',
    backgroundColor: state.isFocused ? '#FAFBFC' : 'transparent',
    padding: '10px 12px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#FAFBFC',
      color: '#313237',
    },
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: 'transparent',
    color: '#313237',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width: '100%',
    border: '1px solid #E2E6E9',
    background: '#FFF',
    boxShadow: '0px 2px 15px 0px rgba(0, 0, 0, 0.05)',
    margin: '4px 0',
    maxHeight: 'none',
    overflowY: 'hidden',
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    maxHeight: 'none',
  }),
  indicatorSeparator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (
    provided: CSSObjectWithLabel,
    state: DropdownIndicatorProps
  ) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }),
};
