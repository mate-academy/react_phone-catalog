export function getFormattedCapacity(capacity: string) {
  return `${parseInt(capacity, 10)} ${capacity.endsWith('GB') ? 'GB' : 'TB'}`;
}