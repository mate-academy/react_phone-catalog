import { StylesConfig } from 'react-select';

export const customSelectStyles: StylesConfig = {
  control: base => ({
    ...base,
    // усе стилізується через SCSS, мінімально втручаємося
    cursor: 'pointer',
    // 'border-color': state.isFocused ? 'none' : 'none',
  }),

  menu: base => ({
    ...base,
    // menu тінь уже задано в SCSS
  }),

  option: (base, state) => ({
    ...base,
    // колір, фон та інше — через SCSS класи `&--is-selected`, `&--is-focused`
    cursor: 'pointer',
    color: 'none',
    // background: 'none',

    background: state.isFocused || state.isSelected ? 'none' : 'none',
  }),

  singleValue: base => ({
    ...base,
    // кольори через SCSS
    color: 'none',
    background: 'none',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  indicatorsContainer: base => ({
    ...base,
    // padding або icon — через SCSS
  }),
};
