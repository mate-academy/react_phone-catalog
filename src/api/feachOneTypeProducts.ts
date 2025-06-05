export const fetchProducts = async (category:string): Promise<Product[]> =>{
  switch (category) {
    case 'phones': response = await fetch('./api/phones.json');
      break;

    case 'tablets': response = await fetch('./api/tablets.json');
      break;
    case 'accessories': response = await fetch('./api/accessories.json');
      break;


    default:
      return 0;
  }
