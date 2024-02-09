import { ProductDetails } from '../definitions/types/ProductDetails';

export const getColorHex = (color: string) => {
  switch (color) {
    case 'black': return '#201D24';
    case 'rosegold': return '#B76E79';
    case 'gold': return '#f6e0c9';
    case 'silver': return '#E4E4E2';
    case 'spacegray': return '#25282A';
    case 'green': return '#364935';
    case 'yellow': return '#F3D060';
    case 'white': return '#F9F6EF';
    case 'purple': return '#B8AFE6';
    case 'red': return '#E23636';
    case 'coral': return '#EE7762';
    case 'midnightgreen': return '#4E5851';
    case 'pink': return '#FAE0D8';
    case 'starlight': return '#F9F3EE';
    case 'skyblue': return '#6BA1C4';
    default: {
      // eslint-disable-next-line
      console.error(`Unexpected color: ${color}`);

      return '#201D24';
    }
  }
};

export const getSpecArrayFromProduct = (product: ProductDetails) => {
  return {
    screen: product.screen,
    resolution: product.resolution,
    processor: product.processor,
    ram: product.ram,
    capacity: product.capacity,
    camera: product.camera,
    zoom: product.zoom,
    cell: product.cell.join(', '),
  };
};

export function prepareAdditionalInformation() {
  const errorImgWhenUserWillBeOffline = new Image();

  errorImgWhenUserWillBeOffline.src = './img/informative/error-img.webp';
}
