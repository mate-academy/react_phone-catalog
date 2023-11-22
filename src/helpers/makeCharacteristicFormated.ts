export function makeCharFormated(char: string) {
  const numericPart = char.match(/\d+/);
  const unitPart = char.match(/[A-Za-z]+/);

  if (numericPart && unitPart) {
    return `${numericPart[0]} ${unitPart[0]}`;
  }

  return char;
}
