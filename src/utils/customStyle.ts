import { StylesConfig, GroupBase } from 'react-select';
import { OptionType } from '../types/OptionType';

const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    borderColor:
      state.isFocused || state.selectProps.menuIsOpen ? '#0F0F11' : '#B4BDC3',
    boxShadow: 'none',
    height: '40px',
    padding: '0px',
    '&:hover': {
      borderColor: '#89939A',
      cursor: 'pointer',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#0F0F11' : '#89939A',
    backgroundColor: state.isSelected
      ? '#FAFBFC'
      : state.isFocused
        ? '#FAFBFC'
        : 'white',
    '&:hover': {
      backgroundColor: '#FAFBFC',
      color: 'black',
    },
  }),
  singleValue: provided => ({
    ...provided,
    color: '#0F0F11',
  }),
  menu: provided => ({
    ...provided,
    margin: '0px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: 'transform 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    color: '#B4BDC3', // Постійний колір стрілки
    '&:hover': {
      color: '#B4BDC3', // Не змінює колір при наведенні
    },
  }),
};

export default customStyles;
