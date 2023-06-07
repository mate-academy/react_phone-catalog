import { Phone } from '../../types/Phone';
import { PhoneSlider } from '../PhoneSlider/PhoneSlider';

type Props = {
  phones: Phone[],
};

export const NewModels: React.FC<Props> = ({ phones }) => {
  const sortedPhones = phones.sort((a, b) => {
    return b.price - a.price;
  });

  return (
    <div className="hot-phones">
      <PhoneSlider
        products={sortedPhones}
        phones={phones}
        title="Brand new models"
      />
    </div>
  );
};
