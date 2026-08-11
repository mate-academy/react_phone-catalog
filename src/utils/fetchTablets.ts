import tablets from '../../public/api/tablets.json';
import { Tablet } from '../types/tablet';

export function fetchTablets(): Tablet[] {
  return tablets as Tablet[];
}
