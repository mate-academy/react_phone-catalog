export function getUrlProduct(productType: string, productID: string) {
  switch (productType) {
    case 'phone':
      return `/phones/${productID}`;

    case 'tablet':
      return `/tablets/${productID}`;

    case 'accessory':
      return `/accessories/${productID}`;

    default:
      return '/products';
  }
}
