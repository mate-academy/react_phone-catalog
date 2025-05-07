import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavigationState {
  links: string[];
}

const initialState: NavigationState = {
  links: [],
};

export const navigationSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    addLink(state, { payload }: PayloadAction<string>) {
      state.links.push(payload);
    },
    removeGood(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        links: state.links.filter(link => link !== payload),
      };
    },
    clearLinks(state) {
      return {
        ...state,
        links: [],
      };
    },
  },
});

export const {} = navigationSlice.actions;
export default navigationSlice.reducer;
