import './Main.scss';
import Phonecategory from '../../../public/img/main-category--phone.png';
import Tabletcategory from '../../../public/img/main-category--tablet.png';
// eslint-disable-next-line max-len
import Accessorycategory from '../../../public/img/main-category--accessory.png';
import { useEffect, useState } from 'react';
import { getAccessories } from '../../api';
import { getPhones } from '../../api';
import { getTablets } from '../../api';
import { Link } from 'react-router-dom';
import Swiper from '../../components/MainSwiper/MainSwiper';
import NewModelsSlider from '../NewModelsSlider/NewModelsSlider';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

type Counts = {
  phones: number;
  tablets: number;
  accessories: number;
};

type MainProps = {
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
};

const Main = ({ favorites, baskets, setFavorites, setBaskets }: MainProps) => {
  const [counts, setCounts] = useState<Counts | null>(null);

  const getCounts = async () => {
    const phones = await getPhones();
    const tablets = await getTablets();
    const accessories = await getAccessories();

    return {
      phones: phones.length,
      tablets: tablets.length,
      accessories: accessories.length,
    };
  };

  useEffect(() => {
    getCounts().then(data => setCounts(data));
  }, []);

  return (
    <div className="main">
      <h1 className="main__title">Welcome to Nice Gadgets store!</h1>
      <Swiper />
      <h2 className="second__title">Brand new models</h2>
      <NewModelsSlider
        baskets={baskets}
        setBaskets={setBaskets}
        setFavorites={setFavorites}
        favorites={favorites}
      />
      <div className="category__section">
        <h2 className="second__title">Shop by category</h2>
        <div className="categories">
          <div className="category">
            <Link to="/phones" className="category__image-wrapper">
              <img src={Phonecategory} alt="" className="category__banner" />
            </Link>
            <h3 className="category__text">Mobile phones</h3>
            {counts && (
              <p className="category__count">{counts.phones} models</p>
            )}
          </div>
          <div className="category">
            <Link to="/tablets" className="category__image-wrapper">
              <img src={Tabletcategory} alt="" className="category__banner" />
            </Link>
            <h3 className="category__text">Tablets</h3>
            {counts && (
              <p className="category__count">{counts.tablets} models</p>
            )}
          </div>
          <div className="category">
            <Link to="/accessories" className="category__image-wrapper">
              <img
                src={Accessorycategory}
                alt=""
                className="category__banner"
              />
            </Link>
            <h3 className="category__text">Accessories</h3>
            {counts && (
              <p className="category__count">{counts.accessories} models</p>
            )}
          </div>
        </div>
      </div>
      <h2 className="second__title">Hot prices</h2>
    </div>
  );
};

export default Main;
