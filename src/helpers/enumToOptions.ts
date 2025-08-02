import { TFunction } from 'i18next';
import { DropdownOption } from '../types/DropdownOption';

export function enumToDropdownOptions<T extends Record<string, string>>(
  enumObj: T,
  t: TFunction,
  translationPrefix: string,
): DropdownOption[] {
  return Object.values(enumObj).map(value => ({
    value,
    label: t(`${translationPrefix}.${value}`),
  }));
}
