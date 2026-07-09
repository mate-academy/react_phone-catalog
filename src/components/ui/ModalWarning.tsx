const ModalWarning = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-[368px] rounded-xl shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default ModalWarning;
