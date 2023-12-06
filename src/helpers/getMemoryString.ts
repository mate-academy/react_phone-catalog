export const getMemoryString = (memoryString: string) => {
  const match = memoryString.match(/\d+/);

  if (match === null) {
    throw new Error('Memory string is not valid');
  }

  const memory = +match[0];

  if (memory % 1024 === 0) {
    return `${memory / 1024} GB`;
  }

  return `${memory} MB`;
};
