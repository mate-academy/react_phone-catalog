export const media = {
  tablet: '@media (min-width: 640px)',
  desktop: '@media (min-width: 1200px)',
};

export function shuffleAndTrimArray(arr: any[]) {
  const arrayCopy = [...arr];

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy.slice(0, 15);
}
