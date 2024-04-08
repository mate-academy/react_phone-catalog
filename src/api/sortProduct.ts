import { Products } from "../types/Product";

export const getHotPriceProducts = (product: Products[]) => {
  return [...product].sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));

}

export const getBrandNewProducts = (product: Products[]) => {
  return [...product].sort((a, b) => b.price - a.price);
}