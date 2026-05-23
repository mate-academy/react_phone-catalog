import { SpecKey } from '@/types/SpecKey';

type SpecConfigItem = {
  label: string;
  key: SpecKey;
  optional?: boolean;
};
export const specsConfig: SpecConfigItem[] = [
  { label: 'Screen', key: 'screen' },
  { label: 'Resolution', key: 'resolution' },
  { label: 'Processor', key: 'processor' },
  { label: 'RAM', key: 'ram' },
  { label: 'Built in memory', key: 'capacity' },
  { label: 'Camera', key: 'camera', optional: true },
  { label: 'Zoom', key: 'zoom', optional: true },
  { label: 'Cell', key: 'cell' },
];
