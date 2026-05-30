import { Accessories } from './types/Accessories';
import { Phones } from './types/Phones';
import { Tablets } from './types/Tablets';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getGoods(
  type: string,
): Promise<Phones[] | Tablets[] | Accessories[]> {
  return wait(500)
    .then(() => fetch(`api/${type}.json`))
    .then(response => response.json());
}
