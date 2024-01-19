export function formatMb(mbValue: string) {
  return mbValue === '' ? '' : `${mbValue.split('MB')[0]} ${'MB'}`;
}

export function formatInches(inchesValue: string) {
  return inchesValue === '' ? '' : inchesValue.replace(' inches', '”');
}

export function isBigScreen() {
  return window.innerWidth > 1030;
}
