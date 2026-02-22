import { Middleware } from '@reduxjs/toolkit';

function isActionWithType(action: unknown): action is { type: string } {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as Record<string, unknown>).type === 'string'
  );
}

export const favoritesMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (
    isActionWithType(action) &&
    (action.type === 'favorites/addItemToFavorites' ||
      action.type === 'favorites/removeItemFromFavorites')
  ) {
    const state = store.getState();

    localStorage.setItem('favorites', JSON.stringify(state.favorites.items));
  }

  return result;
};
