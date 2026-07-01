export const getAssetUrl = (path: string) => {
  if (!path) {
    return '';
  }

  if (
    path.startsWith('http') ||
    path.startsWith('https') ||
    path.startsWith('data:')
  ) {
    return path;
  }

  const pathname = window.location.pathname;
  let base = pathname;

  if (base.endsWith('index.html')) {
    base = base.substring(0, base.lastIndexOf('/'));
  }

  if (!base.endsWith('/')) {
    base += '/';
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base}${cleanPath}`;
};

export const getColorHex = (colorName: string): string => {
  const normalized = colorName.toLowerCase().replace(/[\s-]/g, '');
  const colors: Record<string, string> = {
    black: '#1f2022',
    green: '#aee1cd',
    yellow: '#fed166',
    white: '#f5f5f7',
    purple: '#e5d3ed',
    red: '#ba0c2f',
    gold: '#f9e4c9',
    midnightgreen: '#4e5851',
    spacegray: '#535150',
    silver: '#ebebeb',
    rosegold: '#fad4c0',
    coral: '#e76f51',
    blue: '#2e86de',
    pink: '#ffc0cb',
    grey: '#808080',
    bronze: '#cd7f32',
    midnight: '#1e272e',
    starlight: '#faf0e6',
    skyblue: '#87ceeb',
  };

  return colors[normalized] || normalized;
};
