import { StylesConfig } from 'react-select';

type myoptiontype = {
  value: string;
  label: string;
};

type myoptiontype2 = {
  value: number;
  label: string;
};

  type ismulti = false;

const customoptionstyles = {
  backgroundColor: '#fff',
  cursor: 'pointer',
  padding: '10px 12px',
  width: '200px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '21px',
};

export const selectstyle: StylesConfig<myoptiontype, ismulti> = {
  control: (provided, state) => ({
    ...provided,
    ...customoptionstyles,
    backgroundColor: state.isFocused ? '#FAFBFC' : '#FFFFFF',
    borderColor: '#B4BDC3',
    color: '#313237',
    boxShadow: '#FFFFFF',

    '&:hover': {
      borderColor: '#313237',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    ...customoptionstyles,
    borderColor: '#B4BDC3',
    backgroundColor: state.isFocused ? '#FAFBFC' : '#FFFFFF',
    color: state.isFocused ? '#313237' : '#89939A',

    '&:active': {
      backgroundColor: '#FAFBFC',
    },
  }),
};

export const selectstyle2: StylesConfig<myoptiontype2, ismulti> = {
  control: (provided, state) => ({
    ...provided,
    ...customoptionstyles,
    backgroundColor: state.isFocused ? '#FAFBFC' : '#FFFFFF',
    borderColor: '#B4BDC3',
    color: '#313237',
    boxShadow: '#FFFFFF',

    '&:hover': {
      borderColor: '#313237',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    ...customoptionstyles,
    borderColor: '#B4BDC3',
    backgroundColor: state.isFocused ? '#FAFBFC' : '#FFFFFF',
    color: state.isFocused ? '#313237' : '#89939A',

    '&:active': {
      backgroundColor: '#FAFBFC',
    },
  }),
};
