import { Product } from "./product";
import { ProductDetails } from "./productDetails";

export interface productCharacteristics {
  key: keyof Product | keyof ProductDetails;
  name: string;
}
