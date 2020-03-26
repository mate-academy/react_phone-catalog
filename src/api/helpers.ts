export const filterPhones = (filter: string, phones: Phone[]): Phone[] => {
  const filterToLowerCase = filter.toLowerCase();

  return phones
    .filter(phone => phone.name.toLocaleLowerCase().includes(filterToLowerCase)
      || phone.snippet.toLocaleLowerCase().includes(filterToLowerCase));
};
