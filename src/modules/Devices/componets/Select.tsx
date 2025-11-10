import Select, { SingleValue } from 'react-select';
import { OptionType } from '../../../types/OptionType';
import { useSearchParams } from 'react-router-dom';
import customStyles from '../../../utils/customStyle';

type Props = {
  options: OptionType[];
  selectedOption: OptionType | null;
  setSelectedOption: (value: OptionType | null) => void;
};

const SelectComponent: React.FC<Props> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setSelectedOption(option);
      const params = new URLSearchParams(searchParams);

      params.set('perPage', option.value);
      setSearchParams(params);
    }
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      placeholder="Select an option"
      id="sortState"
    />
  );
};

export default SelectComponent;
