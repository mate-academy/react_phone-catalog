const URL_PHONES = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';
const URL_DETAILS = 'https://mate-academy.github.io/react_phone-catalog/api/products/'

export const getPhones = async () => {
  const preparedInfo = await fetch(URL_PHONES);
  const phonesInfo: Good[] = await preparedInfo.json();

  return phonesInfo
}

export const getPhoneById = async (catalog: Good[]) => {
  const phonesId = catalog.map(phone => phone.id);
  const phonesDetailsById: GoodDetail[] = [];

  for (const key of phonesId) {
    const preparedInfo = await fetch(`${URL_DETAILS}${key}.json`);
    const phoneDetails = await preparedInfo.json();

    phonesDetailsById.push(phoneDetails);
  }

  return phonesDetailsById;
}
