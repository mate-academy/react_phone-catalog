import { toast } from 'react-toastify';

export const showSuccess = (title: string) => toast.success(title);
export const showError = (title: string) => toast.error(title);
export const showInfo = (title: string) => toast.info(title);
