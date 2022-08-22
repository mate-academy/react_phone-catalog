import { useState } from 'react';
import { useSelector } from 'react-redux';
import { HotPrices } from './HotPrices/HotPrices';
import './Main.scss';
import { NewModels } from './NewModels/NewModels';
import { ShopCategory } from './ShopCategory/ShopCategory';
import { TopBanners } from './TopBanners/TopBanners';
import { getFavoritesSelector } from '../../store/selectors';

export const Main: React.FC = () => {
  const [isNumberBanner, setIsNumberBanner] = useState(1);
  const favorites = useSelector(getFavoritesSelector);

  // eslint-disable-next-line no-console
  console.log(favorites);

  return (
    <div className="main">
      <div className="main__topbanners">
        <TopBanners
          setIsNumberBanner={setIsNumberBanner}
        />
        <div className="main__smallbars">
          <div className={isNumberBanner === 1
            ? 'main__bar main__bar--isactive'
            : 'main__bar'}
          />
          <div className={isNumberBanner === 2
            ? 'main__bar main__bar--isactive'
            : 'main__bar'}
          />
          <div className={isNumberBanner === 3
            ? 'main__bar main__bar--isactive'
            : 'main__bar'}
          />
        </div>
        <HotPrices />
        <ShopCategory />
        <NewModels />
      </div>
    </div>
  );
};
