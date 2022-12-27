export function getRenderedCapacity(capacity: string) {
  const capacityValue = +capacity.slice(0, -2);
  let capacityInGB = '';

  if (capacityValue >= 1000) {
    capacityInGB = `${Math.round(capacityValue / 1000)}GB`;
  }

  return capacityValue < 1000
    ? capacity
    : capacityInGB;
}
