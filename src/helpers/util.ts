export const setLocalStorageItem = (name: string, data: any) => {
  localStorage
    .setItem(
      name,
      JSON.stringify(data),
    );
};

export const getItemLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name) as string);
};
