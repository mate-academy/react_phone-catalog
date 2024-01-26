import { ProductDetails } from "../definitions/types/ProductDetails";

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
    case 'midnightgreen': return '#4E5851';
    default: throw Error(`Unexpected color: ${color}`); // only for develop
  }
}

export const getSpecArrayFromProduct = (product: ProductDetails) => {
  const {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  return {
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  };
};
