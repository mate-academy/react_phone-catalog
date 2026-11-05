export type WithImageUrls<T> = T & {
  imageUrls: string[];
};

export type With360ImageUrls<T> = WithImageUrls<T> & {
  image360Urls: string[];
};
