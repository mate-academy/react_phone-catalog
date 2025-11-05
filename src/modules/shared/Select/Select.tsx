import ReactSelect, { StylesConfig } from 'react-select';
import { SelectOption } from '../../../types/SelectOptions';
import './Select.scss';

interface Props {
  value: SelectOption;
  options: SelectOption[];
  onChange: (selectedOption: SelectOption | null) => void;
  hideBorder?: boolean;
}

const Select: React.FC<Props> = ({ value, options, onChange, hideBorder }) => {
  const customStyles: StylesConfig<SelectOption, false> = {
    control: (_provided, state) => ({
      borderColor: hideBorder ? (state.isFocused ? '' : 'transparent') : '',
    }),
    menu: () => ({}),
    option: () => ({}),
    placeholder: () => ({}),
  };

  return (
    <ReactSelect<SelectOption>
      className="select__container"
      classNamePrefix="select"
      options={options}
      onChange={onChange}
      value={value}
      menuPlacement="top"
      isSearchable={false}
      unstyled={true}
      styles={customStyles}
    />
  );
};

export default Select;
