export const getCheckQuery = (str:string, query: string) => {
  return str.toUpperCase().includes(query.toUpperCase().trim());
};
