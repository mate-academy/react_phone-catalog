export async function fetchData() {
  const phonesResponse = await fetch('/api/phones.json');
  const phonesFromServer = await phonesResponse.json();

  const tabletsResponse = await fetch('/api/tablets.json');
  const tabletsFromServer = await tabletsResponse.json();

  const accessoriesResponse = await fetch('/api/accessories.json');
  const accessoriesFromServer = await accessoriesResponse.json();

  const productsResponse = await fetch('/api/products.json');
  const productsFromServer = await productsResponse.json();

  return {
    phonesFromServer,
    tabletsFromServer,
    accessoriesFromServer,
    productsFromServer,
  };
}
