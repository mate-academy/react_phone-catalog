import { Icon as ActualIcon } from './Icon';
import { IconCounter as Counter } from './IconCounter';
import { IconWrapper as Wrapper } from './IconWrapper';

/**
 * @description Wrapper is required only when used with Counter
 * @example
 * <Icon.Wrapper>
 *   <Icon variant="cart" />
 *   <Icon.Counter>12</Icon.Counter>
 * </Icon.Wrapper>
 */
export const Icon = Object.assign(ActualIcon, {
  Wrapper,
  Counter,
});
