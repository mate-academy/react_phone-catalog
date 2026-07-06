export function getNewId(namespaceId: string, capacity: string, color: string) {
  return [namespaceId, capacity, color]
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
