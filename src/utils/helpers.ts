import { useEffect, useState } from 'react';

export function getCorrectUrl(string: string) {
  switch (string) {
    case 'sky blue':
      return 'sky-blue';
    case 'rose gold':
      return 'rose-gold';
    case 'space gray':
      return 'space-gray';

    default:
      return string;
  }
}

export function getCssColor(color: string) {
  switch (color) {
    case 'midnight':
      return '#191970';
    case 'spacegray':
    case 'space gray':
      return '#4B4B4F';
    case 'midnightgreen':
      return '#004953';
    case 'rosegold':
      return '#b76e79';
    case 'spaceblack':
      return '#0b0b0c';
    case 'sierrablue':
      return '#7393b3';
    case 'graphite':
      return '#383838';
    case 'sky blue':
      return 'skyblue';
    case 'starlight':
      return '#f1f1f1';

    default:
      return color;
  }
}

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export function getCorrectCase(
  count: string,
  possibleOptions: [string, string, string],
): string {
  const last = count.at(-1);
  const prev = count.at(-2) || '';
  const regex = /[2-4]/;

  if (last === '1' && prev !== '1') {
    return possibleOptions[0];
  }

  if (regex.test(last!) && prev !== '1') {
    return possibleOptions[1];
  }

  return possibleOptions[2];
}
