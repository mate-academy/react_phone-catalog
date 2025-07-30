import type { Author } from '../../types/author/author';

const API_URL = '/api/authors.json';

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function getAuthors(): Promise<Author[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then((response) => response.json());
}
