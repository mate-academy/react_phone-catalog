import React from 'react';
import { DispatchContext, StateContext } from '../store/GlobalProvider';

export const useDispatch = () => React.useContext(DispatchContext);
export const useGlobalState = () => React.useContext(StateContext);
