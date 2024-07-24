const productsApi = [
  fetch('api/phones.json'),
  fetch('api/tablets.json'),
  fetch('api/accessories.json'),
];

export async function fetchProducts() {
  const [phonesRes, TabletsRes, AccessoriesRes] =
    await Promise.all(productsApi);

  const phones = await phonesRes.clone().json();
  const tablets = await TabletsRes.clone().json();
  const accessories = await AccessoriesRes.clone().json();

  return [phones, tablets, accessories];
}
