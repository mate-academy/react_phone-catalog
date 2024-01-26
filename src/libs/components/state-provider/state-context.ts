import { createContext } from 'react';
import { StateType } from '../../types';
import { initialState } from './initial-state';

export const StateContext = createContext<StateType>(initialState);
