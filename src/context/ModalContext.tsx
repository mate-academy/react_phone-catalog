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

  const showSuccessModal = useCallback((message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);

    // Fecha o modal automaticamente após n segundos
    setTimeout(() => {
      setIsModalOpen(false);
    }, 5000);
  }, []);

  const closeModal = () => {
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
