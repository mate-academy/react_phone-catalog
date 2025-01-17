// eslint-disable-next-line import/no-extraneous-dependencies
import { TypedUseSelectorHook, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { AppDispatch } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
