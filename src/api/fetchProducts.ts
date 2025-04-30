import { ShopItem } from '../types/ShopItem';
import { Product } from '../types/Product';

const API_BASE_URL = './api/';
const API_URL_PRODUCTS = './api/products.json';

export async function getProduct(
  category: string,
  id: string,
): Promise<ShopItem> {
  const generetedApi = `${API_BASE_URL}${category}.json`;

  const response = await fetch(`${generetedApi}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ShopItem[] = await response.json();

  const product: ShopItem | undefined = data.find((p: ShopItem) => p.id === id);

  if (!product) {
    throw new Error(`Product not found`);
  }

  return product;
}

export function getProducts(): Promise<Product[]> {
  return fetch(`${API_URL_PRODUCTS}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return res.json();
  });
}





// export const getNotificationsWithLogo = async () => {
//   const notificationsWithLogo: Notification[] = [];

//   try {
//     const notificationsResponse = await getAllNotifications();

//     if (notificationsResponse.data.results && notificationsResponse.data.results.length > 0) {
//       const notifications = notificationsResponse.data.results;

//       for (const notification of notifications) {
//         if (notification.data.email) {
//           try {
//             const email = await getEmails(notification.data.email);

//             if (email.data.results && email.data.results.length > 0) {
//               const uuid = email.data.results[0].related_website;

//               try {
//                 const websiteResponse = await companiesServices.getCompanyByUUID(uuid);

//                 if (websiteResponse.data) {
//                   const logoUrl = websiteResponse.data?.logo_url || null;
//                   notificationsWithLogo.push({ ...notification, logo_url: logoUrl });
//                 }
//               } catch (e) {
//                 console.log(`error in getCompanyByUUID ${e}`);
//               }
//             }
//           } catch (e) {
//             console.log(`error in getEmails ${e}`);
//           }
//         }
//       }
//     }
//   } catch (e) {
//     console.log(`error in getAllNotifications ${e}`);
//   }

//   return notificationsWithLogo;
// };
