interface AddEffectProps {
  name?: string;
  effect: boolean;
}

const AddEffect = ({ name, effect }: AddEffectProps) => {
  return (
    <div className={effect ? 'add-effect add-effect-active' : 'add-effect'}>
      <p>{name ? name : 'product'} added to cart</p>
    </div>
  );
};

export default AddEffect;
