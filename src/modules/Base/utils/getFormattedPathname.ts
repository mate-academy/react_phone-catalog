export function getFormattedPathname(pathname: string): string[] {
  return pathname.split('/').filter(item => item !== '');
}
