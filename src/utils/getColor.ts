export const getColor = (color: string) => {
  if (color.includes(' ')) {
    if (color.includes('green')) {
      return 'lightgreen';
    } else if (color.includes('red')) {
      return 'red';
    } else if (color.includes('gray')) {
      return 'gray';
    } else if (color.includes('blue')) {
      return 'lightblue';
    } else if (color.includes('gold')) {
      return 'gold';
    } else if (color.includes('black')) {
      return 'black';
    }
  } else if (color === 'midnight') {
    return 'midnightblue';
  } else if (color.includes('gray') || color === 'graphite') {
    return 'gray';
  } else if (color.includes('blue')) {
    return 'lightblue';
  } else if (color === 'rosegold') {
    return 'pink';
  } else if (color.includes('black')) {
    return 'black';
  }

  return color;
};
