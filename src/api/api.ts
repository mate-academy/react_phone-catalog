import { getItems } from "./fetch";

export const getFrom = {
  getPhones: async() => await getItems('api/phones.json'),
  getTables: async() => await getItems('api/tablets.json'),
  getAccessories: async() => await getItems('api/accessories.json'),
}
