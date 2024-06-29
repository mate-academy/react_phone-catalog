export const removeWhiteSpaces = <T extends Record<string, any>>(
  obj: T,
  ...keys: (keyof T)[]
): T => {
  const copiedObj = { ...obj };

  for (const key of keys) {
    const value = copiedObj[key];

    if (typeof value === 'string') {
      copiedObj[key] = value.replaceAll(' ', '-');
    } else if (Array.isArray(value)) {
      copiedObj[key] = value.map((valueItem: string) => {
        if (typeof valueItem === 'string') {
          return valueItem.replaceAll(' ', '-');
        }

        return valueItem;
      });
    }
  }

  return copiedObj;
};
