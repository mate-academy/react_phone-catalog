export function getFormattedCrumb(crumb?: string) {
  if (crumb) {
    return crumb.split('-').map(part => {
      return part[0].toUpperCase() + part.slice(1);
    }).join(' ');
  }

  return '';
}
