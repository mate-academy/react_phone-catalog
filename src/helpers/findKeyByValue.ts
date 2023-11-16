/* eslint-disable @typescript-eslint/no-explicit-any */
export const findKeyByValue = <T extends Record<string, any>>(
  objects: T[],
  targetValue: string | number | null,
) => {
  let foundKey = '';

  objects.forEach((obj) => {
    if (foundKey === '') {
      Object.keys(obj).some((key) => {
        switch (true) {
          case obj[key] !== null
            && obj[key].toString().toLowerCase()
            === targetValue?.toString().toLowerCase(): {
            foundKey = key;

            return true;
          }

          case Array.isArray(obj[key])
            && obj[key].some(
              (item: { toString: () => string; } | null) => item !== null
                && item
                  .toString()
                  .toLowerCase() === targetValue?.toString().toLowerCase(),
            ): {
            foundKey = key;

            return true;
          }

          default:
            return false;
        }
      });
    }
  });

  return foundKey;
};
