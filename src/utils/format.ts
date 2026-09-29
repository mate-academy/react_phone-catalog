export function formatPrice(value: number): string {
  return `$${value}`;
}

export function toDisplayId(slug: string): string {
  let hash = 0;

  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 1000000;
  }

  return String(Math.abs(hash)).padStart(6, '0');
}
