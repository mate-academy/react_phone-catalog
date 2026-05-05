import { PropsPhone } from '../types/Products';
import { getData } from './httpClient';

export function getPhones(phoneId: string) {
  return getData<PropsPhone[]>('/phones.json').then(posts =>
    posts.filter(post => post.id === phoneId),
  );
}
