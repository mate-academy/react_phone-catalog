import '../styles/gallery.scss';
import '../styles/cardsSlider.scss';
import '../styles/container.scss';
import '../styles/categories.scss';
import { Gallery } from '../components/Gallery';
import { CardsSlider } from '../components/CardsSlider';
import { Categories } from '../components/Categories';
import { Phone } from '../components/ProductCard';

type Props = {
  favorite: string[],
  cart: string[],
  gadgetsList: Phone[],
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
};

export const Home: React.FC<Props> = ({
  favorite,
  cart,
  gadgetsList,
  handleCart,
  handleFavorite,
}) => {
  return (
    <>
      <Gallery />
      <CardsSlider
        title="Hot prices"
        list={gadgetsList.filter((item: Phone) => item.discount !== 0)}
        favorite={favorite}
        cart={cart}
        handleCart={handleCart}
        handleFavorite={handleFavorite}
      />
      <Categories gadgetsList={gadgetsList} />
      <CardsSlider
        title="Brand new models"
        list={gadgetsList.filter((item: Phone) => item.discount === 0)
          .sort((a: Phone, b: Phone) => b.price - a.price)}
        favorite={favorite}
        cart={cart}
        handleCart={handleCart}
        handleFavorite={handleFavorite}
      />
    </>
  );
};
