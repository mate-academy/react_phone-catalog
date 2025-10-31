export const fetchProducts = async (): Promise<[]> => {
  try {
    const response = await fetch('/api/products.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const fetchPhones = async (): Promise<[]> => {
  try {
    const response = await fetch('/api/phones.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const phones: [] = await response.json();

    return phones;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const fetchAccessories = async (): Promise<[]> => {
  try {
    const response = await fetch('/api/accessories.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const phones: [] = await response.json();

    return phones;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const fetchTablets = async (): Promise<[]> => {
  try {
    const response = await fetch('/api/tablets.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const phones: [] = await response.json();

    return phones;
  } catch (error) {
    console.error(error);

    return [];
  }
};
