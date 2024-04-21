import { Option } from '../types/Option';
import { PerPageValues } from '../types/PerPageValues';

export const perPageOptions: Option[] = [
  { name: 'all', value: PerPageValues.ALL },
  { name: '4', value: PerPageValues.FOUR },
  { name: '8', value: PerPageValues.EIGHT },
  { name: '16', value: PerPageValues.SIXTEEN },
];
