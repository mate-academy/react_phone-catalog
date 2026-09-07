import { DescriptionType } from '../types/DescriptionType';

interface Description {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  capacity?: string;
  camera?: string;
  zoom?: string;
  cell?: string;
}

export const descriptionsCreator = (description: Description) => {
  const readyDescriptons: { [key: string]: string | number }[] = [];

  for (const key in description) {
    const value = description[key as keyof Description];

    if (value) {
      const enumKey = key.toUpperCase() as keyof typeof DescriptionType;

      readyDescriptons.push({
        [DescriptionType[enumKey]]: value,
      });
    }
  }

  return readyDescriptons;
};
