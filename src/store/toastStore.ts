import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  description?: string;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, description?: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],
  addToast: (message, description) => {
    const id = Date.now().toString();

    set(state => ({
      toasts: [...state.toasts, { id, message, description }],
    }));
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(toast => toast.id !== id),
      }));
    }, 1500);
  },
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },
}));
