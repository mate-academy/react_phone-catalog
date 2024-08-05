export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getList(
  currentPage: number,
  total: number,
  perPage: number | string,
): number[] {
  let startIndex = 0;
  let endIndex = 0;

  if (+perPage) {
    startIndex = (currentPage - 1) * +perPage;
    endIndex = Math.min(startIndex + +perPage, total);
  } else {
    startIndex = 0;
    endIndex = total;
  }

  return [startIndex, endIndex];
}

export function getAmountPage(perPage: string, total: number) {
  let amountOfPage = 0;

  if (perPage !== 'all' && total % +perPage === 0) {
    amountOfPage = Math.floor(total / +perPage);
  } else if (perPage !== 'all' && total % +perPage !== 0) {
    amountOfPage = Math.floor(total / +perPage) + 1;
  } else {
    amountOfPage = total;
  }

  return amountOfPage;
}

export function getNewPages(currentPage: number, pages: number[]) {
  let startIndex = 0;
  let endIndex = 0;

  if (pages.length - currentPage <= 2) {
    startIndex = pages.length - 4;
    endIndex = pages.length;
  } else {
    startIndex = Math.max(0, +currentPage - 2);
    endIndex = Math.min(startIndex + 3, pages.length - 1);
  }

  return pages.slice(startIndex, endIndex + 1);
}

export function getCategory(pathname: string) {
  switch (true) {
    case pathname === '/tablets':
      return 'Tablets';
    case pathname === '/phones':
      return 'Phones';
    case pathname === '/accessories':
      return 'Accessories';
    default:
      return '';
  }
}

const cssColorNames = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
];

export function checkColorAvailability(string: string) {
  const lowerCaseString = string.toLowerCase();

  for (const color of cssColorNames) {
    if (lowerCaseString.includes(color)) {
      return color;
    }
  }

  return null;
}
