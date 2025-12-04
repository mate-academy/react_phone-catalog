const numInput = (e: React.FormEvent<HTMLInputElement>) => {
  const regexp = /[^0-9+\-\s()]/g;

  // eslint-disable-next-line no-param-reassign
  e.currentTarget.value = e.currentTarget.value.replace(regexp, '');
};

const capitalize = (ref: string) => (e: React.FormEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;

  if (value.length > 0 && ref.length === 0) {
    // eslint-disable-next-line no-param-reassign
    e.currentTarget.value =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
};

export { numInput, capitalize };
