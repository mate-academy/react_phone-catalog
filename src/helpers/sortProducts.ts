import { SortOption } from "../enums/SortOption";
import { IProductCard } from "../interfaces/ProductCard.interface";

export const sortProducts = (value: string, data: IProductCard[]) => {
  let sortedProducts = [...data];

  switch (value) {
    case SortOption.Newest:
      sortedProducts.sort((a, b) => a.year - b.year);
      break;

    case SortOption.Alphabetically:
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case SortOption.Cheapest:
      sortedProducts.sort((a, b) => a.price - b.price);
      break;

    default:
      break;
  }

  return sortedProducts;
};