import { ThumbnailsCarouselProvider } from './ThumbnailsCarouselContext';
import { ThumbnailsCarousel as Carousel } from './ThumbnailsCarousel';
import { Thumbnails } from './Thumbnails';

export const ThumbnailsCarousel = Object.assign(ThumbnailsCarouselProvider, {
  Carousel,
  Thumbnails,
});
