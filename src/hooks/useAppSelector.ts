import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
