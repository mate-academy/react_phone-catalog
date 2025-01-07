export async function fetchJson(filename: string) {
  try {
    const response = await fetch(`/api/${filename}.json`);

    if (!response.ok) {
      throw new Error(`Error fetching ${filename}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function fetchAllJson() {
  const filenames = ['accessories', 'phones', 'products', 'tablets'];
  const promises = filenames.map(name => fetchJson(name));

  return Promise.all(promises);
}

export async function getSuggestedProducts(count = 5) {
  const allProducts = await fetchAllJson();
  const flatProducts = allProducts.flat().filter(Boolean);

  if (flatProducts.length <= count) {
    return flatProducts;
  }

  const shuffled = flatProducts.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}
