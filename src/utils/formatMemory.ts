export const formatMemory = (value: string): string => {
  return value.replace(/^(\d+)(GB|TB|MB)$/i, '$1 $2');
};
