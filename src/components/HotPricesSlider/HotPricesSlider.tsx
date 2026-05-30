import React, { useContext, useEffect } from 'react';

import { CatalogContext } from '../../CatalogContext';

import { ProductSlider } from '../ProductSlider/ProductSlider';
import { useUnique } from '../../utils/useUnique';

export const HotPricesSlider: React.FC = () => {
  const { hotPrisModels, loader, setLoader } = useContext(CatalogContext);
  const modelForShow = [...useUnique(hotPrisModels)];

  useEffect(() => {
    if(hotPrisModels.length > 0) {
      setLoader(false)
    }
  }, [hotPrisModels])


  return loader ? <div className="container"><p>Loading...</p></div> : <ProductSlider models={modelForShow} sectionName={'hot-prices'} />;
};
