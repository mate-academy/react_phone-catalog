import { COLOR_MAP } from "./colorMap";

export const getCssColor = (color: string): string => {
  const normalized = String(color).toLowerCase().replace(/[-\s]/g, '');
  
  return COLOR_MAP[normalized] || COLOR_MAP['default'];
};
