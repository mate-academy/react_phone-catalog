export const getItemId = (product: any): string => {
  // 1. якщо є нормальний itemId → беремо його
  if (product?.itemId && typeof product.itemId === 'string') {
    return product.itemId;
  }

  // 2. якщо id строка 
  if (product?.id && typeof product.id === 'string') {
    return product.id;
  }

  // 3. якщо id число → робимо fallback (slug)
  if (product?.id && typeof product.id === 'number') {
    return `${product.category}-${product.id}`;
  }


  return '';
};

export const getUniqueId = (product: any): string => {
  const baseId = getItemId(product);

  const normalize = (str: string) => str?.toLowerCase() || '';

  return `${baseId}-${normalize(product.color)}-${normalize(product.capacity)}`;
};