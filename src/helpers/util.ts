export const setLocalStorageItem = (name: string, date: any) => {
  localStorage
    .setItem(
      name,
      JSON.stringify(date),
    );
};

export const getItemLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name) as string);
};
