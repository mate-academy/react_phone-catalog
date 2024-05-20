export const getKnownColor = (v: string) => {
  let knownColor = v.toLowerCase();

  if (knownColor.includes('space')) {
    knownColor = knownColor.replace('space', '').trim();
  }

  if (knownColor.includes('sierra')) {
    knownColor = knownColor.replace('sierra', '').trim();
  }

  if (knownColor.includes('midnight')) {
    knownColor = knownColor.replace('midnight', '').trim();

    if (!knownColor.length) {
      knownColor = '#0a0913';
    }
  }

  if (knownColor.includes('graphite')) {
    knownColor = '#41424c';
  }

  if (knownColor.includes('sky blue') || knownColor.includes('skyblue')) {
    knownColor = '#87ceeb';
  }

  if (knownColor.includes('rosegold') || knownColor.includes('rose gold')) {
    knownColor = '#ecc5c0';
  }

  return knownColor;
};
