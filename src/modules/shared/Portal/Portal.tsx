import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = { id: string; children: React.ReactNode };

const PORTAL_ERROR_MSG =
  // eslint-disable-next-line max-len
  'There is no portal container in markup. Please add portal container with proper id attribute.';

export const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(PORTAL_ERROR_MSG);
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};
