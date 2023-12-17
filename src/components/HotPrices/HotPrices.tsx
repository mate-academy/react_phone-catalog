import React, {
  useContext,
  useState,
} from 'react';
import cn from 'classnames';
import { AppContext } from '../../store/AppProvider';

import { ProductsSlider } from '../ProductsSlider';
import { mediaInfo, itemsOnScreen } from '../../helpers/MediaInfo';
import { MediaWidth } from '../../types/Media';

import './HotPrices.scss';

const itemWidth = MediaWidth.mobileWidth + MediaWidth.productCardGap - 0.5;

export const HotPrices: React.FC = () => {
  const { hotPriceProducts } = useContext(AppContext);
  const [crntItemIndx, setCrntItemIndx] = useState(0);

  console.info(mediaInfo()); // eslint-disable-line

  const visibleProducts
    = hotPriceProducts.slice(0, 12);

  const handleNextClick = () => {
    setCrntItemIndx(Math.min(
      crntItemIndx + 1,
      visibleProducts.length - itemsOnScreen(),
    ));
  };

  const handlePrevClick = () => {
    setCrntItemIndx(Math.max(crntItemIndx - 1, 0));
  };

  return (
    <div className="HotPrices HotPrices__container" data-cy="cardsContainer">
      <div className="HotPrices__top">
        <h2 className="HotPrices__title">Hot Prices</h2>

        <div className="HotPrices__buttons">
          <button
            type="button"
            className={cn('HotPrices__button', 'icon--arrow-left', {
              'HotPrices__button--enabled': !!crntItemIndx,
            })}
            onClick={handlePrevClick}
            aria-label="Previous"
          />
          <button
            type="button"
            className={cn('HotPrices__button', 'icon--arrow-right', {
              'HotPrices__button--enabled':
                crntItemIndx < visibleProducts.length - itemsOnScreen(),
            })}
            onClick={handleNextClick}
            aria-label="Next"
          />
        </div>
      </div>

      <ProductsSlider
        products={visibleProducts}
        itemWidth={itemWidth}
        crntItemIndx={crntItemIndx}
        gap={MediaWidth.productCardGap}
      />
    </div>
  );
};
