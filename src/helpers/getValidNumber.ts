export const getValidNumber = (
  dangerValue: string | number,
  fallback: number,
) => {
  const dangerNumber =
    typeof dangerValue === 'string' ? parseInt(dangerValue) : dangerValue;

  if (!isNaN(dangerNumber)) {
    return dangerNumber;
  }

  return fallback;
};
