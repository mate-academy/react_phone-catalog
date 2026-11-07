export function getScreenLabel(screen: string): string {
  const diagonal = screen.split(' ')[0];

  if (screen.includes('LTPO OLED')) {
    return `${diagonal} LTPO OLED`;
  }
  if (screen.includes('OLED')) {
    return `${diagonal} OLED`;
  }
  if (screen.includes('Retina')) {
    return `${diagonal} Retina`;
  }
  if (screen.includes('IPS')) {
    return `${diagonal} IPS`;
  }

  return diagonal;
}
