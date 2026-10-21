export const matchesQuery = (name: string, query: string) =>
  query.split(/\s+/).every(word => name.toLowerCase().includes(word));
