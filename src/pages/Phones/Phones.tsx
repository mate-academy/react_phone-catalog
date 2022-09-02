import { Gadgets } from '../../Components/Gadgets/Gadgets';
import './Phones.scss';

type Props = {
  searchInput: string;
};

export const Phones: React.FC<Props> = ({ searchInput }) => {
  const pageDescription = ['phones', 'Mobile phones', 'phone'];

  return (
    <div className="Phones">
      <Gadgets pageDescription={pageDescription} searchInput={searchInput} />
    </div>
  );
};
