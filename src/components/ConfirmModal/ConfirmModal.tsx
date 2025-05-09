import { ConfirmModalProps } from "@/types/Product";

export const ConfirmModal = ({ isOpen, onConfirm, onCancel }: ConfirmModalProps) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-color-btn-purple rounded-xl p-6 w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-lg font-semibold text-text-color-base-white">
              Checkout is not implemented yet. Do you want to clear the Cart?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      );
}