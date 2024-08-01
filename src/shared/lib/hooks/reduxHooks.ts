/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/providers/StoreProvider';
import { StateSchema } from '../../../app/providers/StoreProvider/config/StateSchema';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
