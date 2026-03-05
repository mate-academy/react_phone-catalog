export interface Book {
  id: string;
  type: 'paperback' | 'kindle' | 'audiobook';
  namespaceId: string;
  name: string;
  slug: string;
  priceRegular: number;
  priceDiscount: number | null;
  images: string[];
  langAvailable: string[];
  lang: string;
  author: string;
  coverType?: string | number | null;
  numberOfPages?: number;
  format?: string | null;
  illustrations?: boolean;
  narrator?: string;
  listeningLength?: number;
  publicationYear: number;
  publication: string;
  category?: string[];
  description: string[];
}

export type CartItem = Book & { quantity: number };
