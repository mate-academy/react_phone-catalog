import { client } from "../utils/fetchClients"

export const getAllProducts = () => {
  return client.get('api/products.json');
}

export const getPhones = () => {
  return client.get('api/phones.json');
};

export const getTablets = () => {
  return client.get('api/tablets.json');
};

export const getAccessories = () => {
  return client.get('api/accessories.json');
};