type Props = {
  iconName: string;
};

export const Icon: React.FC<Props> = ({ iconName }) => (
  <svg className="icon">
    <use href={`img/icons.svg#${iconName}`}></use>
  </svg>
);
