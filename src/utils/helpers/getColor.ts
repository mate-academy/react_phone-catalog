import namedColors from 'color-name-list';

export function getColor(el: string) {
  const missingColorInHex: { [key: string]: string } = {
    spacegray: '#343d46',
    midnightgreen: '#004953',
    rosegold: '#b76e79',
  };

  const hexColor = namedColors.find(colorEl => {
    return colorEl.name === el[0].toUpperCase() + el.slice(1);
  });

  if (!hexColor && !missingColorInHex[el]) {
    // ! Testing purpose to detect missing color
    // eslint-disable-next-line no-alert
    window.alert(`add missing color! for ${el}`);
  }

  return hexColor?.hex || missingColorInHex[el];
}
