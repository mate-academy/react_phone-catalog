import React from "react";

import accessories from '../../../public/api/accessories.json';
import { ProductsCategory } from "../ProductsCategory/ProductsCategory";

export const Accessories: React.FC = () => {
  return (
    <ProductsCategory
      products={accessories}
      title="Accessories"
      categoryName="Accessories"
    />
  )
}
