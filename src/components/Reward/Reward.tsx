import { useReward } from 'react-rewards';
import { useEffect } from 'react';

export const CheckoutCelebration = ({ trigger }: { trigger: boolean }) => {
  const rewardId = 'checkout-reward';
  const { reward } = useReward(rewardId, 'emoji');

  useEffect(() => {
    if (trigger) {
      reward();
    }
  }, [trigger]);

  return (
    <span
      id={rewardId}
      style={{ width: 1, height: 1, display: 'inline-block' }}
    />
  );
};
