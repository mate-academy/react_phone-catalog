import {Images} from "../types/Product";

export const imagesExtractor = (color: keyof Images, images: Images) => {
  return images[color] || [];
};
