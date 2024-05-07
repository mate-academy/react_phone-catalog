import { Icon as ActualIcon } from './Icon';
import { IconCounter } from './IconCounter';
import { IconWrapper } from './IconWrapper';

/**
 * @description Wrapper is required only when used with Counter
 * @example
 * <Icon.Wrapper style={{ margin: '10px' }}>
 *   <Icon variant="cart" />
 *   <Icon.Counter>12</Icon.Counter>
 * </Icon.Wrapper>
 */
export const Icon = Object.assign(ActualIcon, {
  Wrapper: IconWrapper,
  Counter: IconCounter,
});
