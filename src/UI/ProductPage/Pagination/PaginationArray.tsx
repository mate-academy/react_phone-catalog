
type Props = {
  array: JSX.Element;
  onChange: (isNext?: boolean) => void;
  next?: boolean;
};

const PaginationArray = ({ array, onChange, next = false }: Props) => {
  return (
    <div
      className="hover: grid size-8 cursor-pointer place-items-center rounded-full border-1 border-elem text-bodyText duration-150 hover:border-primary"
      onClick={() => onChange(next)}
    >
      {array}
    </div>
  );
};

export default PaginationArray;
