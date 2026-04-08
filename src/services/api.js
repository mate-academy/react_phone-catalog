// src/services/api.js
// const API_BASE = `api`;
import { BASE_URL } from './baseUrl';

const API_BASE = `${BASE_URL}api`;

/**
 * Returns URL for specific type (phones|tablets|accessories).
 */
export const getTypeUrl = type => `${API_BASE}/${type}.json`;
export const getAllUrl = () => `${API_BASE}/products.json`;
/**
 * Fetch products by type (phones|tablets|accessories).
 * If type file doesn't exist, fallback to products.json and filter by type.
 */
// export async function fetchProducts(type) {
//   // Try to fetch specific file first
//   try {
//     const res = await fetch(getTypeUrl(type));

//     if (!res.ok) {
//       // fallback to all products
//       throw new Error('Type file not found');
//     }

//     const json = await res.json();

//     return json;
//   } catch (e) {
//     // Fallback: load all products and filter by type
//     const resAll = await fetch(getAllUrl());

//     if (!resAll.ok) {
//       throw new Error('Products not found');
//     }

//     const all = await resAll.json();

//     // assume each product has a `type` field
//     return Array.isArray(all) ? all.filter(p => p.type === type) : [];
//   }
// }

export async function fetchProducts(type) {
  // 1. ЗАХИСТ: Якщо тип не передали взагалі, просто вантажимо всі товари
  if (!type || type === 'undefined') {
    const resAll = await fetch(getAllUrl());

    if (!resAll.ok) {
      throw new Error('Products not found');
    }

    return resAll.json();
  }

  // 2. Якщо тип передали (наприклад 'phones')
  try {
    const res = await fetch(getTypeUrl(type));

    if (!res.ok) {
      throw new Error('Type file not found');
    }

    const json = await res.json();

    return json;
  } catch (e) {
    // Fallback: завантажити всі і відфільтрувати
    const resAll = await fetch(getAllUrl());

    if (!resAll.ok) {
      throw new Error('Products not found');
    }

    const all = await resAll.json();

    return Array.isArray(all) ? all.filter(p => p.type === type) : [];
  }
}

/**
 * Fetch single product by id.
 * Searches in specific type file(s) first, then in products.json.
 */
export async function fetchProductById(id) {
  if (!id || id === 'undefined') {
    throw new Error('Invalid Product ID');
  }

  // Try to fetch all possible files one by one (optional optimization)
  const types = ['phones', 'tablets', 'accessories'];

  for (const t of types) {
    try {
      const res = await fetch(getTypeUrl(t));

      if (!res.ok) {
        continue;
      }

      const arr = await res.json();

      if (!Array.isArray(arr)) {
        continue;
      }

      const found = arr.find(p => String(p.id) === String(id));

      if (found) {
        return found;
      }
    } catch (e) {
      // ignore and continue
    }
  }

  // Fallback to products.json
  const resAll = await fetch(getAllUrl());

  if (!resAll.ok) {
    throw new Error('Products not found');
  }

  const all = await resAll.json();

  if (!Array.isArray(all)) {
    throw new Error('Products data is invalid');
  }

  const found = all.find(p => String(p.id) === String(id));

  if (!found) {
    throw new Error('Product not found');
  }

  return found;
}
