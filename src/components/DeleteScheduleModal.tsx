import React, { type JSX } from "react";
import fetchHelper from "../api";
import { toast } from "react-toastify";


interface ScheduleItem {
  _id: number;
}
interface ModalProps {
  isOpen: boolean;
  onClose: (item: any) => void;
  fetchData: () => void;
  scheduleID:ScheduleItem |undefined
}
const DeleteScheduleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
fetchData,
scheduleID
}): JSX.Element => {
console.log(scheduleID)
  const handleDelete = async () => {
    const apiEndpoint = `delete/${scheduleID?._id}`;
    const response = await fetchHelper({
      url: apiEndpoint,
      method: "DELETE",
    });

    toast.success(response?.msg || "Scheduled Delete successfully");
    fetchData();
    onClose(undefined)
  };
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
              <button className="px-6 py-2 bg-red-800 text-white rounded " onClick={handleDelete}>
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
