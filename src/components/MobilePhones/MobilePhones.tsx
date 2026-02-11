import React from "react";

import phones from '../../../public/api/phones.json';
import { ProductsCategory } from "../ProductsCategory/ProductsCategory";

export const MobilePhones: React.FC = () => {
  return (
    <ProductsCategory
      products={phones}
      title="Mobile phones"
      categoryName="Phones"
    />
  )
}
