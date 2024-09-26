import { ProductType } from "./type/ProductType";
import { ProductTypeExtended } from "./type/ProductTypeExtended";

const BASE_URL = 'https://raw.githubusercontent.com/fs-jun24-team5/group_project_team5/main/public/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getProducts = () => get<ProductType[]>('/products');
export const getPhones = () => get<ProductTypeExtended[]>('/phones');
export const getTablets = () => get<ProductTypeExtended[]>('/tablets');
export const getAccessories = () => get<ProductTypeExtended[]>('/accessories');

