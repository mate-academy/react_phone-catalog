import { OptionType } from '../../types/OptionType';
import { Dropdown } from '../Dropdown';
import { useSearchWith } from '../../hooks/useSearchWith';

interface Props {
  searchKey: string;
  options: OptionType[];
  initialOption?: OptionType;
  ladel?: string;
  width?: number;
}

export const SearchDropdown: React.FC<Props> = ({
  searchKey,
  options,
  initialOption,
  ladel,
  width,
}) => {
  const { searchParams, setSearchWith } = useSearchWith();

  const paramValue = searchParams.get(searchKey) || '';
  const selectedOption =
    options.find(opt => opt.value === paramValue) ||
    initialOption ||
    options[0];

  const handleChangeOption = (newOption: OptionType) => {
    setSearchWith({
      [searchKey]: newOption.value || null,
      page: null,
    });
  };
  return (
    <Dropdown
      options={options}
      initialOption={selectedOption}
      choosedOption={handleChangeOption}
      ladel={ladel}
      width={width}
    />
  );
};
