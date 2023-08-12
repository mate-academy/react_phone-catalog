import { useReducer } from 'react';

export enum ActionType {
  changedColor = 'changed_color',
  changedCapacity = 'changed_capacity',
  changedImage = 'changed_image',
}

type Action = {
  type: ActionType;
  value: number;
};

const initialState = {
  colorId: 0,
  capacityId: 0,
  imageId: 0,
};

const reducer = (state: typeof initialState, { type, value }: Action) => {
  switch (type) {
    case ActionType.changedColor:
      return {
        ...state,
        colorId: value,
      };

    case ActionType.changedCapacity:
      return {
        ...state,
        capacityId: value,
      };

    case ActionType.changedImage:
      return {
        ...state,
        imageId: value,
      };

    default:
      return state;
  }
};

type ReturnType = [typeof initialState, React.Dispatch<Action>];

export const useProductReducer = (): ReturnType => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};
