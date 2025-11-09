import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import SuccessModal from '../components/SuccessModal/SuccessModal';

interface ModalContextType {
  showSuccessModal: (message: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showSuccessModal = useCallback(
    (message: string) => {
      // Limpa o timeout anterior se existir
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setModalMessage(message);
      setIsModalOpen(true);

      // Cria um novo timeout
      const newTimeoutId = setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);

      setTimeoutId(newTimeoutId);
    },
    [timeoutId],
  );

  const closeModal = () => {
    // Limpa o timeout quando o modal é fechado manualmente
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showSuccessModal }}>
      {children}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </ModalContext.Provider>
  );
};
