export const formatMemory = (memoryString: string) =>
  memoryString.replace(/(\d+)([a-zA-Z]+)/g, '$1 $2');
