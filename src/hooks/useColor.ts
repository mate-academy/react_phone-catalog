// color codes referrnced from https://brandpalettes.com/apple-iphone-colors/

export const useColor = (namespace: string, color: string) => {
  const colors = {
    'apple-iphone-7': {
      black: '#1f2020',
      silver: '#e4e4e2',
      gold: '#dfccb7',
      rosegold: '#e6c7c2',
    },
    'apple-iphone-8': {
      silver: '#e4e4e2',
      spacegray: '#25282a',
      gold: '#f5ddc5',
    },
    'apple-iphone-xr': {
      white: '#f9f6ef',
      yellow: '#f3d060',
      coral: '#ee7762',
      red: '#a5282c',
    },
    'apple-iphone-xs': {
      spacegray: '#25282a',
      gold: '#f5ddc5',
    },
    'apple-iphone-xs-max': {
      spacegray: '#25282a',
      black: '#1f2020',
      silver: '#e4e4e2',
    },
    'apple-iphone-11': {
      purple: '#d1cdda',
      yellow: '#ffe681',
      green: '#aeec1d',
      black: '#1f2020',
      white: '#f9f6ef',
      red: '#ba0c2e',
    },
    'apple-iphone-11-pro': {
      midnightgreen: '#4e5851',
      silver: '#ebebe3',
      spacegray: '#535150',
      gold: '#fad7db',
    },
    'apple-iphone-12': {
      black: '#201d24',
      white: '#fbf7f4',
      red: '#e23636',
      purple: '#b8afe6',
    },
    'apple-iphone-13-mini': {
      midnight: '#171e27',
      white: '#f9f3ee',
      blue: '#215e7c',
      pink: '#fae0d8',
    },
    'apple-iphone-13-pro-max': {
      graphite: '#5c5b57',
      gold: '#f9e5c9',
      sierrablue: '#9BB5CE',
    },
    'apple-iphone-14': {
      midnight: '#222930',
      yellow: '#f9e479',
      purple: '#e6ddeb',
    },
    'apple-iphone-14-pro': {
      spaceblack: '#403e3d',
      gold: '#f4e8ce',
    },
    'apple-ipad-pro-11-2021': {
      spacegray: '#535150',
      silver: '#ebebe3',
    },
    'apple-ipad-air-4th-gen': {
      'rose gold': '#fcd7d0',
      silver: '#ebebe3',
      green: '#d4e6d1',
      'sky blue': '#dae7f2',
    },
    'apple-ipad-mini-6th-gen': {
      spacegray: '#535150',
      starlight: '#e2dbd0',
      pink: '#fae5e6',
    },
    'apple-ipad-10-2-2020': {
      silver: '#e4e4e2',
      spacegray: '#25282a',
      gold: '#f5ddc5',
    },
    'apple-ipad-mini-5th-gen': {
      silver: '#e4e4e2',
      spacegray: '#25282a',
      gold: '#f5ddc5',
    },
    'apple-watch-series-3': {
      silver: '#c6c7cb',
      'space gray': '#25282a',
      gold: '#e9d5d3',
    },
    'apple-watch-series-4': {
      silver: '#e8e6e5',
      gold: '#f4d5cc',
      'space gray': '#25282a',
    },
    'apple-watch-series-5': {
      silver: '#e8e6e5',
      gold: '#f4d5cc',
      'space gray': '#25282a',
    },
    'apple-watch-series-6': {
      silver: '#e8e6e5',
      gold: '#f4d5cc',
      'space gray': '#25282a',
      blue: '#252d44',
      red: '#e23636',
    },
    'apple-watch-se': {
      silver: '#e4e4e2',
      'space gray': '#25282a',
      gold: '#f5ddc5',
    },
  };

  const model = colors[namespace as keyof typeof colors];

  return model?.[color as keyof typeof model];
};
