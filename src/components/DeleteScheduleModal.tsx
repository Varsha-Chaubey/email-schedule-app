import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const DeleteScheduleModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-end">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 max-w-lg border border-zinc-300 mr-40 ">
            <h4 className="text-slate-500 font-medium text-center mt-6">
              Are you sure want to delete schedule?
            </h4>
            <div className="flex justify-around items-center my-6">
              <button
                className="px-6 py-2 border border-zinc-300 rounded text-gray-700 hover:text-gray-900 bg-gray-100  "
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-red-800 text-white rounded ">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteScheduleModal;
