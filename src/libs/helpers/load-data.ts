import { LOADING_DELAY } from '../enums';
import { ErrorMessages } from '../enums/app/error-messages.enum';
import { wait } from './wait';

const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export async function loadData<T>(endpoint = ''): Promise<T> {
  const url = endpoint ? `${BASE_URL}/${endpoint}.json` : `${BASE_URL}.json`;

  await wait(LOADING_DELAY);

  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw new Error(`${response.status}: ${ErrorMessages.LoadDataError}`);
}
