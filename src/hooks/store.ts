import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '../utils/products';
import { cartSlice } from '../utils/cart';
import { favouriteSlice } from '../utils/favourite';

const rootReducer = combineSlices(productsSlice, cartSlice, favouriteSlice);

export const store = configureStore({
  reducer: rootReducer,
});

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof rootReducer>;
// Выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
