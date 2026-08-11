import phones from '../../public/api/phones.json';
import { Phone } from '../types/phone';

export function fetchPhones(): Phone[] {
  return phones as Phone[];
}
