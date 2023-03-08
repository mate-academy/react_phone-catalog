import Select, { SingleValue } from 'react-select';
import { SelectOption } from '../../types/SelectOption';

import './Select.scss';

type Props = {
  placeholder: string,
  defaultValue?: SelectOption,
  options: SelectOption[],
  onChange: (optiob: SingleValue<SelectOption>) => void,
  selectTitle: string,
  classModificator?: string,
};

export const SelectItem: React.FC<Props> = ({
  placeholder, defaultValue, options, onChange, selectTitle, classModificator,
}) => {
  return (
    <div
      role="button"
      className="select"
    >
      <div className="select__title">
        {selectTitle}
      </div>

      <Select
        unstyled
        placeholder={placeholder}
        isSearchable={false}
        defaultValue={defaultValue}
        options={options}
        className={`select-container ${classModificator}`}
        classNamePrefix="select-item"
        onChange={onChange}
      />
    </div>
  );
};
