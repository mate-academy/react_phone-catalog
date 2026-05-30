export const parseProductId = (id: string) => {
  const decodedId = decodeURIComponent(id);
  const parts = decodedId.split('-');

  const capacityPattern = /^(\d+)(gb|tb|mm|ml|oz|kg)?$/i;
  let capacityIndex = -1;

  for (let i = parts.length - 1; i >= 0; i--) {
    if (capacityPattern.test(parts[i])) {
      capacityIndex = i;
      break;
    }
  }

  if (capacityIndex !== -1) {
    const name = parts.slice(0, capacityIndex).join('-');
    const capacity = parts[capacityIndex];
    const color = parts
      .slice(capacityIndex + 1)
      .join('-')
      .replace(/\s+/g, '-');

    return { name, capacity, color };
  }

  const color = parts.pop()?.replace(/\s+/g, '-') || '';
  const capacity = parts.pop() || '';
  const name = parts.join('-');

  return { name, capacity, color };
};
