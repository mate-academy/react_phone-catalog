import { Spec } from './SpecsList';

export const getSpecsFromObject = (obj: Record<string, string>): Spec[] =>
  Object.entries(obj).map(([title, value]) => ({
    title,
    value,
  }));
