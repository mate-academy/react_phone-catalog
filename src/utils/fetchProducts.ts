export const fetchProducts = async (category?: string, product?: string) => {
  try {
    if (!product) {
      const response = await fetch(`./api/products.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products catalog`);
      }

      const allProducts = await response.json();
      return category ? allProducts.filter((product: any) => product.category === category) : allProducts;
    }

    if (category && product) {
      const response = await fetch(`./api/${category}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} data`);
      }

      const categoryProducts = await response.json();
      return categoryProducts.find((item: any) => item.id === product) || null;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return product ? null : [];
  }
};
