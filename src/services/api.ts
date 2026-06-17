export const getPhones = async () => {
  const res = await fetch('/api/phones.json');

  return res.json();
};

export const getTablets = async () => {
  const res = await fetch('/api/tablets.json');

  return res.json();
};

export const getAccessories = async () => {
  const res = await fetch('/api/accessories.json');

  return res.json();
};
