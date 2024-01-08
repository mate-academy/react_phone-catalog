type Props = {
  name: string;
  quantity: string;
  styleName: string;
};

const setImage = (arg: string) => {
  switch (arg) {
    case 'Mobile phones':
      return 'category-phones';

    case 'Tablets':
      return 'category-tablets';

    default:
      return 'category-accessories';
  }
};

export const CategoryBox: React.FC<Props> = ({ name, quantity, styleName }) => {
  return (
    <div className={styleName}>
      <div
        className="relative overflow-hidden h-[368px] w-[368px] block-shadow"
      >
        <img
          className="absolute max-w-none"
          src={`_new/img/category-images/${setImage(name)}.png`}
          alt={name}
        />
      </div>
      <h3 className="text-[20px] text-primary mt-6">{name}</h3>
      <p className="text[14px] text-secondary font-medium">{quantity}</p>
    </div>
  );
};
