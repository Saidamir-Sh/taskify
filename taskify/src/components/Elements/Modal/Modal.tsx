import { usePortal } from "../../../hooks/use-portal";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
   const { render } = usePortal();

   return render(
      isOpen && (
         <>
            <div className="backdrop fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-md shadow-md">{children}</div>
         </>
      )
   );
}