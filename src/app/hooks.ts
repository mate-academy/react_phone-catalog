import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, AppState } from './store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
