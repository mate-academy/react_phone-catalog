import { Category } from './Components/Category/Category';
import { HotPrice } from './Components/HotPrices/HotPrice';
import { NewModele } from './Components/NewModels/NewModele';
import { PictureSlide } from './Components/PictureSlide/PictureSlide';
import '../../style/GlobalStyle.scss';

export const HomePage = () => (
  <div className="container">
    <PictureSlide />
    <NewModele />
    <Category />
    <HotPrice />
  </div>
);
