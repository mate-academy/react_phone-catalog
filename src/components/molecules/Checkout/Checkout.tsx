import { ButtonSelect } from '../../atoms/Buttons/ButtonSelect';
import { Typography } from '../../atoms/Typography/Typography';

type Props = {
  sum?: number;
  amount?: number;
  onCheckout: () => void;
};

export const Checkout: React.FC<Props> = ({
  sum = 0,
  amount = 0,
  onCheckout,
}) => {
  return (
    <div className="w-full border border-elements flex flex-col items-center p-6">
      <Typography level="h2">${sum}</Typography>
      <Typography
        level="body"
        className="text-secondary"
      >
        Total for {amount} items
      </Typography>

      <span className="h-px w-full bg-elements my-6" />
      <ButtonSelect
        content="Checkout"
        className="h-12 w-full bg-primary hover:cursor-pointer text-white items-center justify-center flex hover-zoom-small hover:border-primary dark:bg-accent-dark dark:border-none dark:hover:bg-accent-hover-dark"
        handleClick={() => onCheckout()}
        isSelected={true}
      />
    </div>
  );
};
