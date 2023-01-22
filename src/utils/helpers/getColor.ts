import namedColors from 'color-name-list';

export function getColor(el: string) {
  const missingColorInHex: { [key: string]: string } = {
    spacegray: '#535150',
    midnightgreen: '#4e5851',
    rosegold: '#b76e79',
    green: '#aee1cd',
    yellow: '#ffe681',
    purple: '#b8afe6',
    red: '#e23636',
    gold: '#fad7bd',
    silver: '#f5f5f0',
  };

  const hexColor = namedColors.find(colorEl => {
    return colorEl.name === el[0].toUpperCase() + el.slice(1);
  });

  if (!hexColor && !missingColorInHex[el]) {
    // ! Testing purpose to detect missing color
    // eslint-disable-next-line no-alert
    window.alert(`add missing color! for ${el}`);
  }

  return missingColorInHex[el] || hexColor?.hex;
}
