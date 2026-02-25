import { DetailsProductType } from '../types/DetailsProductType';
import { client } from './httpRequest';

export const getPhone = () => client.get<DetailsProductType[]>('/phones.json');
export const getTablets = () =>
  client.get<DetailsProductType[]>('/tablets.json');
export const getAccessories = () =>
  client.get<DetailsProductType[]>('/accessories.json');
