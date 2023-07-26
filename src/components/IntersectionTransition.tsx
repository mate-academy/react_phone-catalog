import { useInView } from 'react-intersection-observer';

type Props = {
  children: JSX.Element,
  bacground?: string,
};

export const Transition: React.FC<Props> = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      style={{
        transition: 'all 0.5s ease',
        opacity: !inView ? 0 : 1,
      }}
    >
      {children}
    </div>
  );
};
