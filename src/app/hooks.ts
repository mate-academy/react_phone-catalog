import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Використовуй `useAppDispatch` замість звичайного `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Використовуй `useAppSelector` замість звичайного `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
