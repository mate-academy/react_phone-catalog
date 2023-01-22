export function capitalize(arg: string) {
  return arg && arg[0].toUpperCase() + arg.slice(1);
}

export function lower(arg: string) {
  return arg && arg.toLowerCase();
}

export function getRandomId() {
  return String(Math.random()).slice(2, 8);
}
