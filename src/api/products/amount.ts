import { Category } from "../../definitions/enums/Api";
import { request } from "../../utils/fetchHelper";

export function getProductsAmount(category: Category, search?: string | null) {
  if (search) {
    
  }

  return request<number>(`categories/${category}/amount.json`);
};