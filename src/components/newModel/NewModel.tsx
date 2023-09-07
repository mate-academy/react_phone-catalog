import { Phone } from '../../types/phone';
import { HotPrice } from '../HotPrice/HotPrice';
import '../phones/phone.scss';
import './style.scss';

type Props = {
  phones: Phone[]
  title: string
  showOldPrice: boolean
};

export const NewModel: React.FC<Props> = ({ phones, title, showOldPrice }) => {
  const newPhones = phones.filter(newPhone => newPhone.name.includes('11'));

  return (
    <div className="model">
      <HotPrice
        phones={newPhones}
        title={title}
        showOldPrice={showOldPrice}
      />
    </div>
  );
};

export default NewModel;
