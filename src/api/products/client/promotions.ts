import { request } from "../../../utils/fetchHelper"

export const getPromotions = () => {
  return request<string[]>('/img/engagements/promotions.json');
}