import React from 'react';
import Select, { SingleValue } from 'react-select';
import { OptionType } from '../../../types/OptionType';
import { useSearchParams } from 'react-router-dom';
import customStyles from '../../../utils/customStyle';

type Props = {
  options: OptionType[];
  selectedOption: OptionType | null;
  setSelectedOption: (value: OptionType | null) => void;
};

export const SortSelect: React.FC<Props> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setSelectedOption(option);

      const params = new URLSearchParams(searchParams);

      if (option.label === 'Alphabetically') {
        params.set('sort', 'title');
        setSearchParams(params);
      } else if (option.label === 'Newest') {
        params.set('sort', 'age');
        setSearchParams(params);
      } else {
        params.set('sort', 'price');
        setSearchParams(params);
      }
    }
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      placeholder="Choose"
      id="sortBy"
    />
  );
};

export default SortSelect;
