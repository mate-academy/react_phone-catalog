import { useHeaderContext } from '../../provider/HeaderContext';
import { Phone } from '../../types/phone';
import { PhonesCard } from '../phones/PhonesCard';
import './style.scss';

type Props = {
  phones: Phone[]
};

export const SearchPhones: React.FC<Props> = ({ phones }) => {
  const { inputValue } = useHeaderContext();

  const findPhones = (input: string) => {
    const value = input.trim().toLowerCase();

    return phones.filter(phone => phone.name.toLowerCase().includes(value));
  };

  return (
    <div className="search">
      <p className="results">{`${findPhones(inputValue).length} results`}</p>

      <PhonesCard phones={findPhones(inputValue)} showOldPrice />
    </div>
  );
};
