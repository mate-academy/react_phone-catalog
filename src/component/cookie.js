export const exportCookie = (dado, local, index, quantidade = 1) => {
  const info = JSON.stringify(dado);

  const expira = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

  document.cookie = `${local}${index}_${quantidade}=${encodeURIComponent(info)}; expires=${expira}; path=/; Secure; SameSite=Strict`;
};

export const importCookie = local => {
  const cookiesArr = [];

  const cookie = document.cookie
    .split('; ')
    .filter(item => item.startsWith(`${local}`));

  cookie.forEach(r => {
    try {
      const info = r.split('=').slice(1).join('=');

      if (!info) {
        return;
      }

      const newInfo = JSON.parse(decodeURIComponent(info));

      cookiesArr.push(newInfo);
    } catch (error) {
      throw new Error('Erro ao importar cookie:', error);
    }
  });

  return cookiesArr.length > 0 ? cookiesArr : [];
};

export const getQuantidade = (local, index) => {
  const cookieFound = document.cookie
    .split('; ')
    .find(item => item.startsWith(`${local}${index}`));
  const quantidade = cookieFound?.slice(
    cookieFound.indexOf('_') + 1,
    cookieFound.indexOf('='),
  );

  return Number(quantidade);
};

export const deleteCookie = (local, index) => {
  document.cookie = `${local}${index}_${getQuantidade(local, index)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const addOrDeleteProduct = (
  info,
  local,
  index,
  quantidade,
  addOrDelete,
) => {
  let quantidadeNew = Number(quantidade);

  if (addOrDelete === 'add') {
    quantidadeNew++;
  } else {
    quantidadeNew--;
  }

  document.cookie = `${local}${index}_${getQuantidade(local, index)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  exportCookie(info, 'cart', index, quantidadeNew);
};
