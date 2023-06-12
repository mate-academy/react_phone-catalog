import './HomePage.scss';

import { HotPhones } from '../../components/HotPhones/HotPhones';
import { TopSlider } from '../../components/TopSlider/TopSlider';
import { Phone } from '../../types/Phone';
import { Category } from '../../components/Category/Category';
import { NewModels } from '../../components/NewModels/NewModels';
import { CartItem } from '../../types/CartItem';

type Props = {
  phones: Phone[],
  likedProducts: Phone[],
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const HomePage: React.FC<Props> = ({
  phones,
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <>
      <div className="home-page">
        <TopSlider />

        <HotPhones
          phones={phones}
          likedProducts={likedProducts}
          setLikedProducts={setLikedProducts}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />

        <Category />

        <NewModels
          phones={phones}
          likedProducts={likedProducts}
          setLikedProducts={setLikedProducts}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />
      </div>
    </>
  );
};
