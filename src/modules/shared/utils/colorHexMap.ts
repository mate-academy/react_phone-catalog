export const COLOR_HEX_MAP: Record<string, string> = {
    black: '#000000',
    white: '#ffffff',
    silver: '#e3e5e6',
    gold: '#f7e1be',
    'rose gold': '#f9ddd5',
    rosegold: '#f9ddd5',
    'space gray': '#575a5d',
    spacegray: '#575a5d',
    spaceblack: '#4c4c4c',
    midnight: '#171d26',
    midnightgreen: '#33453e',
    starlight: '#f7f2eb',
    red: '#b02f34',
    coral: '#ff7f6c',
    yellow: '#f4d754',
    green: '#a8c6a1',
    blue: '#5b7ca3',
    'sky blue': '#a4c3d9',
    sierrablue: '#a4c3d9',
    purple: '#d1cbdb',
    pink: '#fad6e0',
    graphite: '#54524f',
};

export const getColorHex = (colorName: string) =>
    COLOR_HEX_MAP[colorName.toLowerCase()] ?? colorName;
