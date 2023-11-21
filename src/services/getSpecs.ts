export const getSpecs = (specs: { [key: string]: string }) => {
  const specsEntries = Object.entries(specs);
  const preparedSpecs = specsEntries.map(currSpec => {
    const specKey = currSpec[0] === 'ram'
      ? currSpec[0].toUpperCase()
      : currSpec[0].charAt(0).toUpperCase() + currSpec[0].slice(1);

    return [specKey, currSpec[1]];
  });

  return preparedSpecs;
};
