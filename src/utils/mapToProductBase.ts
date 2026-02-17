import { PhoneFull } from "../types/PhoneFull";
import { PhoneShort } from "../types/PhoneShort";
import { ProductBase } from "../types/ProductBase";

export function mapToProductBase(product: PhoneFull | PhoneShort): ProductBase {
  return {
    id: Number(product.id),
    itemId: 'itemId' in product ? product.itemId : String(product.id),
    category: product.category,
    name: product.name,
    price:
      'priceDiscount' in product
        ? (product.priceDiscount ?? product.priceRegular)
        : product.price,
    fullPrice:
      'priceRegular' in product ? product.priceRegular : product.fullPrice,
    image: 'images' in product ? product.images[0] : product.image,
    screen: product.screen,
    capacity: product.capacity,
    ram: product.ram,
    color: 'color' in product ? product.color : undefined,

    favouriteKey: `${product.id}-${product.capacity}-${'color' in product ? product.color : ''}`,
  };
}
