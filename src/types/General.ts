import * as R from 'react';

export type TyChangeEvtInputElmt = R.ChangeEvent<HTMLInputElement>;
export type TyChangeEvtSelectElmt = R.ChangeEvent<HTMLSelectElement>;
export type TyKeybrEvtInputElmt = R.KeyboardEvent<HTMLInputElement>;
export type TySetState<T> = R.Dispatch<R.SetStateAction<T>>;
export type TyUseState<T> = (initSt: T | (() => T)) => [T, TySetState<T>];
