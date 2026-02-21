type ContainerOptions = { id: string; mountNode?: HTMLElement };

export const createContainer = (options: ContainerOptions) => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement('div');

  portalContainer.setAttribute('id', id);
  mountNode.appendChild(portalContainer);
};
