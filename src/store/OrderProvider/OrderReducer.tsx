const CREATE_ORDER = 'CREATE_ORDER';
const CLEAR_ORDER = 'CLEAR_ORDER';

export type OrderState = {
  orderId: string | null;
  expiresAt: number | null;
};

type CreateOrder = {
  type: typeof CREATE_ORDER;
  payload: OrderState;
};

type ClearOrder = {
  type: typeof CLEAR_ORDER;
};

export type OrderAction = CreateOrder | ClearOrder;

export const OrderReducer = (state: OrderState, action: OrderAction) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        orderId: action.payload.orderId,
        expiresAt: action.payload.expiresAt,
      };

    case CLEAR_ORDER:
      return {
        orderId: null,
        expiresAt: null,
      };
    default:
      return state;
  }
};

export const createOrder = (payload: OrderState): CreateOrder => ({
  type: CREATE_ORDER,
  payload,
});

export const clearOrder = (): ClearOrder => ({
  type: CLEAR_ORDER,
});
