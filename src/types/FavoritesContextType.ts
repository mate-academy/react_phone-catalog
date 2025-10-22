import { Product } from './Product'

export type FavoritesContextType = {
	favorites: Product[];
	toggleFavorite: (product: Product) => void;
	isFavorite: (id: string) => boolean;
};