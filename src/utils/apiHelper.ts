// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';

export const dynamicUrlCreator = (id: string) => (`${BASE_URL}/${id}.json`);
