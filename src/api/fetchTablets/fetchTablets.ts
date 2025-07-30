import type { Gadget } from '../../types/gadgets';

const API_URL = '/api/tablets.json';

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function getTablets(): Promise<Gadget[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then((response) => response.json());
}
