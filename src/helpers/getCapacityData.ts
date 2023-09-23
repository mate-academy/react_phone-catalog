import { PickerOption } from '../types/PickerOption';

export function getCapacityData(
  availableCapacity: string[],
): PickerOption[] {
  return availableCapacity.map(capacity => {
    const name = `${capacity.slice(0, -2)} ${capacity.slice(-2)}`;

    return { name, value: capacity.toLowerCase() };
  });
}
