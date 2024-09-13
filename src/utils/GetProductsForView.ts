import { useContext } from "react";
import { Accessory } from "../types/Accessory";
import { Phone } from "../types/Phone";
// import { Product } from "../types/Product";
import { Tablet } from "../types/Tablet";
import { CatalogContext } from "../CatalogContext";

type argument = Phone | Tablet | Accessory;

export const GetPoroductsForView = (products: argument[]) => {
  const { productsFromServer } = useContext(CatalogContext);

  let uniqProducts: string[] = [];
  let result: Phone[] | Tablet[] | Accessory[] = [];

  products.forEach(product => {
    if (!uniqProducts.includes(product.namespaceId) && productsFromServer) {
      const currentProduct = productsFromServer?.find(item => item.itemId === product.id);
      uniqProducts = [...uniqProducts, product.namespaceId];

      if (currentProduct !== undefined) {
        result = [...result, product];
      }
    };
  })

  return result;
}
