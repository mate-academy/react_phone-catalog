export const formatSpecText = (spec: string) => {
  let specCopy = spec;

  if (specCopy.includes("'")) {
    return specCopy.slice(0, specCopy.indexOf("'") + 1) + ' OLED';
  }

  if (specCopy.includes('x;')) {
    return specCopy.replaceAll('x;', 'x /');
  }

  if (specCopy.toLowerCase().includes('mp')) {
    if (specCopy.includes('MP')) {
      specCopy = specCopy.replaceAll('MP', ' Mp');
    }

    return specCopy
      .split('Mp')
      .filter(p => p !== '')
      .map(part => part.trim() + ' Mp')
      .join(' ');
  }

  if (
    specCopy.includes('GB') ||
    specCopy.includes('TB') ||
    specCopy.includes('MB') ||
    specCopy.includes('mm')
  ) {
    const i = specCopy.includes('GB')
      ? specCopy.indexOf('GB')
      : specCopy.includes('TB')
        ? specCopy.indexOf('TB')
        : specCopy.includes('MB')
          ? specCopy.indexOf('MB')
          : specCopy.indexOf('mm');

    return specCopy.slice(0, i) + ' ' + specCopy.slice(i);
  }

  return specCopy;
};
