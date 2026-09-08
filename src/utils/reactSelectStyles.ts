import { StylesConfig } from 'react-select';

export const reactSelectStyles: StylesConfig = {
  control: () => ({
    display: 'flex',
    border: '1px solid #323542',
    boxShadow: 'none',
    backgroundColor: '#323542',
    width: '100%',
    marginBottom: '24px',
    fontFamily: 'Mont, sans-serif',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    cursor: 'pointer',
  }),
  menu: base => ({
    ...base,
    width: '100%',
    backgroundColor: '#1c1c1c',
    fontFamily: 'Mont, sans-serif',
    color: '#fff',
  }),
  menuList: () => ({
    padding: 0,
    border: '1px solid #323542',
  }),
  option: (base, state) => ({
    ...base,
    padding: '8px 12px',
    backgroundColor: state.isSelected
      ? '#905bff'
      : state.isFocused
        ? '#2a2d3a'
        : '#161827',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Mont, sans-serif',
    ':active': {
      backgroundColor: state.isSelected ? '#905bff' : '#2a2d3a',
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    color: '#fff',
    ':hover': {
      color: '#fff',
      backgroundColor: 'transparent',
    },
  }),
  singleValue: base => ({
    ...base,
    color: '#fff',
    fontFamily: 'Mont, sans-serif',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
