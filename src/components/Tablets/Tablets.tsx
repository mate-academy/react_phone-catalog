import React from "react";

import tablets from '../../../public/api/tablets.json';
import { ProductsCategory } from "../ProductsCategory/ProductsCategory";

export const Tablets: React.FC = () => {
  return (
    <ProductsCategory
      products={tablets}
      title="Tablets"
      categoryName="Tablets"
    />
  )
}
