export function capitalize(str: string) {
  return str.replace(/\b\w/g, match => match.toUpperCase());
}
