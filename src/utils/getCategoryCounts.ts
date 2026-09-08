export const getCategoryCounts = async () => {
  const phones = await fetch(`api/phones.json`).then(res => res.json());
  const tablets = await fetch(`api/tablets.json`).then(res => res.json());
  const accessories = await fetch(`api/accessories.json`).then(res =>
    res.json(),
  );

  return {
    phones: phones.length,
    tablets: tablets.length,
    accessories: accessories.length,
  };
};
