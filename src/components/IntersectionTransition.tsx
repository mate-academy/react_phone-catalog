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
      style={{ opacity: !inView ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
};
