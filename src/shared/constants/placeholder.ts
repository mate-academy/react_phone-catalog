const NOT_FOUND_TEXT = 'Image Not Found'.replaceAll(' ', '%20');
const FONT = 'roboto';

export const placeholder = {
  '500x250': `https://placehold.co/500x250?font=${FONT}&text=${NOT_FOUND_TEXT}`,
  '400x600': `https://placehold.co/400x600?font=${FONT}&text=${NOT_FOUND_TEXT}`,
  '500x600': `https://placehold.co/500x600?font=${FONT}&text=${NOT_FOUND_TEXT}`,
} as const;
