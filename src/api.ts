import { BASE_URL } from "./modules/constants/URL's/URL's";

export const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export const client = {
  get<T>(url: string): Promise<T> {
    return wait(500).then(() => fetch(BASE_URL + url).then(handleResponse));
  },
};
