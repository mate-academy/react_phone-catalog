import React, {
  useContext,
  useState,
} from 'react';
import cn from 'classnames';
import { AppContext } from '../../store/AppProvider';

import { ProductsSlider } from '../ProductsSlider';
import { itemsOnScreen } from '../../helpers/MediaInfo';
import { MediaWidth } from '../../types/Media';

import './BrandNewModels.scss';

const itemWidth = MediaWidth.mobileWidth + MediaWidth.productCardGap - 0.5;

export const BrandNewModels: React.FC = () => {
  const { brandNewProducts } = useContext(AppContext);
  const [crntItemIndx, setCrntItemIndx] = useState(0);

  const visibleProducts
    = brandNewProducts.slice(0, 12);

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
    <div
      className="BrandNewModels BrandNewModels__container"
      data-cy="cardsContainer"
    >
      <div className="BrandNewModels__top">
        <h2 className="BrandNewModels__title">Brand new models</h2>

        <div className="BrandNewModels__buttons">
          <button
            type="button"
            className={cn('BrandNewModels__button', 'icon--arrow-left', {
              'BrandNewModels__button--enabled': !!crntItemIndx,
            })}
            onClick={handlePrevClick}
            aria-label="Previous"
          />
          <button
            type="button"
            className={cn('BrandNewModels__button', 'icon--arrow-right', {
              'BrandNewModels__button--enabled':
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
