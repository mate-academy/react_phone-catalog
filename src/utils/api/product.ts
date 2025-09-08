import axios from "axios";
import type { ProductDetails } from "../../modules/shared/types/ProductDetails";

export const getProductById = async (
  id: string,
  category: string
): Promise<ProductDetails | null> => {
  const { data } = await axios.get<ProductDetails[]>(`/api/${category}.json`);
  return data.find((item) => item.id === id) ?? null;
};