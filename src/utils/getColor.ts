import { Colors } from '../constants/Colors';
import { HexColor } from '../types/Category';

export function getColor(value: string): HexColor {
  return Colors[value];
}
