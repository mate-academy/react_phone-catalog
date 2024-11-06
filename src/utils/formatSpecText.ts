export const formatSpecText = (spec: string) => {
  if (spec.includes("'")) {
    return spec.slice(0, spec.indexOf("'") + 1) + ' OLED';
  }

  if (spec.includes('x;')) {
    return spec.replaceAll('x;', 'x /');
  }

  if (spec.includes('MP')) {
    return spec.replaceAll('MP', ' Mp');
  }

  if (spec.includes('GB') || spec.includes('TB') || spec.includes('mm')) {
    const i = spec.includes('GB')
      ? spec.indexOf('GB')
      : spec.includes('TB')
        ? spec.indexOf('TB')
        : spec.indexOf('mm');

    return spec.slice(0, i) + ' ' + spec.slice(i);
  }

  return spec;
};
