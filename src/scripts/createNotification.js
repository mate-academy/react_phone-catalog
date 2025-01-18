export function createNotification(type, description) {
  const notification = document.createElement('div');
  const titleElement = document.createElement('h2');
  const titleDesc = document.createElement('p');

  notification.classList.add('notification');
  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  titleElement.classList.add('title');

  switch (type) {
    case 'success':
      titleElement.textContent = 'Success';
      titleDesc.textContent = description;
      break;
    case 'error':
      titleElement.textContent = 'Error';
      titleDesc.textContent = description;
      break;
    case 'warning':
      titleElement.textContent = 'Warning';
      titleDesc.textContent = description;
      break;
  }

  notification.appendChild(titleElement);
  notification.appendChild(titleDesc);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
