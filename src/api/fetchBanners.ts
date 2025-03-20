export type Banner = {
  image: string;
}

const API_URL_BANNERS = '/api/banners.json';


export function getBanners(): Promise<Banner[]> {
  return fetch(`${ API_URL_BANNERS}`).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
   return res.json();
  });
}
