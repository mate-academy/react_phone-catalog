import './HotPhones.scss';
import { Phone } from '../../types/Phone';
import { PhoneSlider } from '../PhoneSlider/PhoneSlider';
import { CartItem } from '../../types/CartItem';

type Props = {
  phones: Phone[],
  likedProducts: Phone[],
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const HotPhones: React.FC<Props> = ({
  phones,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  const sortedPhones = phones.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return (
    <PhoneSlider
      phones={phones}
      products={sortedPhones}
      title="Hot phones"
      likedProducts={likedProducts}
      setLikedProducts={setLikedProducts}
      cartProducts={cartProducts}
      setCartProducts={setCartProducts}
    />
  );
};
