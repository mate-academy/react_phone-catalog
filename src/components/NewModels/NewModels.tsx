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

export const NewModels: React.FC<Props> = ({
  phones,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  const sortedPhones = phones.sort((a, b) => {
    return b.price - a.price;
  });

  return (
    <div className="hot-phones">
      <PhoneSlider
        products={sortedPhones}
        phones={phones}
        title="Brand new models"
        likedProducts={likedProducts}
        setLikedProducts={setLikedProducts}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
    </div>
  );
};
