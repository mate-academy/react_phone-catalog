export function formatCapacity(capacity: string) {
  const sizeMatch = capacity.match(/\d+/);
  const unitMatch = capacity.match(/[a-zA-Z]+/);

  const size = sizeMatch ? sizeMatch[0] : '';
  const unit = unitMatch ? unitMatch[0] : '';

  return `${size} ${unit}`;
}
