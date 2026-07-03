export function capitalizeFirstWord(string: string): string {
  const trimmedString = string.trim();

  if (!trimmedString) {
    return string;
  }

  const firstLetter = trimmedString.charAt(0).toUpperCase();
  const rest = trimmedString.slice(1);

  return firstLetter + rest;
}
