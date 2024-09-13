import React, { useContext } from "react";

import { CatalogContext } from "../../CatalogContext";

import { ProductSlider } from "../ProductSlider/ProductSlider";
import { useUnique } from "../../utils/useUnique";


export const HotPricesSlider: React.FC = () => {
  const { hotPrisModels } = useContext(CatalogContext)
  const modelForShow = [...useUnique(hotPrisModels)]

  return (
      <ProductSlider
        models={modelForShow}
        sectionName={'hot-prices'}
      />
  )
}
