function addSpaces(val: string): string {
  const letters = val.slice(-2);
  const numbers = val.slice(0, val.length - letters.length);

  return `${numbers} ${letters}`;
}

export default addSpaces;
