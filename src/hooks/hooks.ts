import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispath: () => AppDispatch = useDispatch;
