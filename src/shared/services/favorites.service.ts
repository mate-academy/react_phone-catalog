import { Product, ShortProduct } from '../models';

type FavoriteItem = ShortProduct | Product;

export class FavoritesStorageService {
  private static readonly FAVORITES_KEY = 'favorites';

  public static addFavorite(item: ShortProduct | Product): void {
    try {
      const data = localStorage.getItem(FavoritesStorageService.FAVORITES_KEY);
      const favorites: FavoriteItem[] = data ? JSON.parse(data) : [];

      if (!Array.isArray(favorites)) {
        throw new Error('Favorites data is not an array');
      }

      if (favorites.some(f => f.id === item.id)) {
        return;
      }

      favorites.push(item);
      localStorage.setItem(
        FavoritesStorageService.FAVORITES_KEY,
        JSON.stringify(favorites),
      );
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  }

  public static removeFavoriteById(idToRemove: string): void {
    try {
      const data = localStorage.getItem(FavoritesStorageService.FAVORITES_KEY);
      const favorites: ShortProduct[] = data ? JSON.parse(data) : [];

      if (!Array.isArray(favorites)) {
        throw new Error('Favorites data is not an array');
      }

      const updated = favorites.filter(item => item.itemId !== idToRemove);
      localStorage.setItem(
        FavoritesStorageService.FAVORITES_KEY,
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  }

  public static isFavorite(idToCheck: string): boolean {
    try {
      const data = localStorage.getItem(FavoritesStorageService.FAVORITES_KEY);
      const favorites: ShortProduct[] = data ? JSON.parse(data) : [];
      if (!Array.isArray(favorites)) {
        throw new Error('Favorites data is not an array');
      }
      return favorites.some(item => item.itemId === idToCheck);
    } catch (error) {
      console.error('Failed to check favorite:', error);
      return false;
    }
  }

  public static loadFavorites(): ShortProduct[] {
    try {
      const data = localStorage.getItem(FavoritesStorageService.FAVORITES_KEY);
      const favorites: ShortProduct[] = data ? JSON.parse(data) : [];
      if (!Array.isArray(favorites)) {
        throw new Error('Favorites data is not an array');
      }
      return favorites;
    } catch (error) {
      console.error('Failed to load favorites:', error);
      return [];
    }
  }

  public static clearFavorites(): void {
    localStorage.removeItem(FavoritesStorageService.FAVORITES_KEY);
  }
}
