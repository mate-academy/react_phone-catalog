import { request } from "../../../utils/fetchHelper";
import { Category } from "../server/types";

export interface CategoryItem {
  name: Category,
  amount: number,
  image: string,
  color: string,
}

export function getCategories() {
  return request<CategoryItem[]>('categories/categories.json');
}