import { PickerOption } from '../types/PickerOption';

const defaultColor: PickerOption = { name: '', value: 'fafbfc' };

const colorsData: PickerOption[] = [
  { name: 'black', value: '#1F2020' },
  { name: 'silver', value: '#EBEBE3' },
  { name: 'rosegold', value: '#FAD7BD' },
  { name: 'gold', value: '#F5DDC5' },
  { name: 'yellow', value: '#FFE681' },
  { name: 'white', value: '#F9F6EF' },
  { name: 'spacegray', value: '#535150' },
  { name: 'purple', value: '#D1CDDA' },
  { name: 'coral', value: '#EE7762' },
  { name: 'green', value: '#AEE1CD' },
  { name: 'midnightgreen', value: '#4E5851' },
  { name: 'red', value: '#BA0C2E' },
];

export function getColorsData(
  availableColors: string[],
): PickerOption[] {
  return availableColors.map(color => {
    return colorsData.find(data => data.name === color) || defaultColor;
  });
}
