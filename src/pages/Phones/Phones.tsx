import { Gadgets } from '../../Components/Gadgets/Gadgets';
import './Phones.scss';

export const Phones = () => {
  const pageDescription = ['phones', 'Mobile phones', 'phone'];

  return (
    <div className="Phones">
      <Gadgets pageDescription={pageDescription} />
    </div>
  );
};
