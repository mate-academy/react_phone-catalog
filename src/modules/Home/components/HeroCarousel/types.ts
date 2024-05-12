import { To } from 'react-router-dom';

/**
 * `images` is an array of image links where the first element is a default image (required).
 *
 * The second one will be displayed on tablets and desktops (optional).
 *
 * The last one will be displayed on desktops only (optional).
 */
export type Slide = {
  to: To;
  images: string[];
  alt: string;
};
