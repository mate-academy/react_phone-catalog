import './ProductCard.scss';

type Props = {
  text1: string,
  text2: string
};

export const TechSpecParagraph: React.FC<Props> = ({ text1, text2 }) => {
  return (
    <div className="dflex mb-8" style={{ justifyContent: 'space-between' }}>
      <div>{text1}</div>
      <div style={{ color: '#313237' }}>
        {text2}
      </div>
    </div>
  );
};
