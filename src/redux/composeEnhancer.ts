import { compose } from 'redux';
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const composeEnhancers = (
  process.env.NODE_ENV === 'development'
  && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
)
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
  })
  : compose;
