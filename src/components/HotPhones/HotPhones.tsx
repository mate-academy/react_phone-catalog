import './HotPhones.scss';
import { Phone } from '../../types/Phone';
import { PhoneSlider } from '../PhoneSlider/PhoneSlider';

type Props = {
  phones: Phone[],
};

export const HotPhones: React.FC<Props> = ({ phones }) => {
  const sortedPhones = phones.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <PhoneSlider phones={phones} products={sortedPhones} title="Hot phones" />
  );
};
