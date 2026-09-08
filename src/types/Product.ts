/**
 * Generate a unique ID for a product based on its category and ID
 * @param category The product category (e.g., 'phone', 'tablet')
 * @param id The product ID
 * @returns A unique string identifier
 */
export const generateProductUniqueId = (
  category: string,
  id: number | string,
): string => {
  return `${category}-${id}`;
};

/**
 * Get a consistent identifier for a product regardless of whether it has a uniqueId
 * @param product The product object
 * @returns A string identifier
 */
export const getProductIdentifier = (product: Product): string => {
  // First priority: use uniqueId if available
  if (product.uniqueId) {
    return product.uniqueId;
  }

  // Second priority: generate id from category and numeric id if both exist
  if (product.category && product.id) {
    const generatedId = generateProductUniqueId(product.category, product.id);

    return generatedId;
  }

  // Final fallback: just use the string version of the numeric id
  const fallbackId = String(product.id);

  return fallbackId;
};

/**
 * Used for checking if two product identifiers refer to the same product
 * This handles various formats of IDs
 * @param id1 First product ID
 * @param id2 Second product ID
 * @returns Boolean indicating if they refer to the same product
 */
export const areProductIdsEquivalent = (id1: string, id2: string): boolean => {
  // Exact match
  if (id1 === id2) {
    return true;
  }

  // Check if one is in the format "category-id" and the other is just "id"
  const id1Parts = id1.split('-');
  const id2Parts = id2.split('-');

  // If one has parts and the other is a simple ID
  if (id1Parts.length > 1 && !isNaN(Number(id2))) {
    return id1Parts[id1Parts.length - 1] === id2;
  }

  if (id2Parts.length > 1 && !isNaN(Number(id1))) {
    return id2Parts[id2Parts.length - 1] === id1;
  }

  return false;
};

export interface Product {
  id: number;
  // Unique identifier that includes category information (optional for backward compatibility)
  uniqueId?: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  category?: string; // Optional for backward compatibility
  phoneId?: string;
  color?: string;
  description?: string[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export interface ProductDetailed extends Product {
  images: string[];
  colors: string[];
  capacities: string[];
  description: string[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
  galleryImages?: string[];
}
