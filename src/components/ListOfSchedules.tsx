import React, { useState } from "react";
import searchImg from "./../assests/search.svg";
import addImg from "./../assests/add-icn.svg";
import editImg from "./../assests/edit-18x18.svg";
import deleteImg from "./../assests/delete.png";
import AddScheduleModal from "./AddScheduleModal";
import DeleteScheduleModal from "./DeleteScheduleModal";
const ListOfSchedules: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  return (
    <>
      <div className="main flex flex-col sm:flex-row bg-gray-100">
        <div className="left main-color w-full sm:w-16 h-16 sm:h-screen">
          {""}
        </div>
        <div className="top-s bg-gray-300 w-full h-16">
          <div className="container py-4 sm:py-24 px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="w-full sm:w-1/3 flex justify-between py-2 px-4 border-2 border-zinc-300 rounded bg-white mb-4 sm:mb-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-none outline-none search-color font-bold w-full"
                  // value={searchTerm}
                  // onChange={handleSearch}
                />
                <img src={searchImg} alt="" className="ml-2" />
              </div>
              <button
                className="w-full sm:w-32 flex justify-around py-2 px-2 btn-border main-color text-white rounded"
                onClick={handleAddModal}
              >
                <img
                  src={addImg}
                  alt=""
                  className="rounded-full border-2 border-white"
                />
                <button className="text-white">Add</button>
              </button>
            </div>
            <table className="mt-8 border-collapse border-2 w-full sm:w-auto">
              <thead className="bg-gray-300 w-full">
                <tr className="text-left">
                  <th className="py-2 px-6 text-left" style={{ width: "10%" }}>
                    Title
                  </th>
                  <th className="py-2 px-6 text-left" style={{ width: "40%" }}>
                    Description
                  </th>
                  <th className="py-2 px-6 text-left" style={{ width: "10%" }}>
                    Subject
                  </th>
                  <th className="py-2 px-6 text-left" style={{ width: "10%" }}>
                    Schedule
                  </th>
                  <th className="py-2 px-6 text-left" style={{ width: "10%" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key={1} className="text-sm bottom-border">
                  <td className="my-2 pl-6 text-left">{"Sample text"}</td>
                  <td className="my-2 pl-6 text-left description">
                    {
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    }
                  </td>
                  <td className="my-2 pl-6 text-left">
                    {"emailSchedule.subject"}
                  </td>
                  <td className="my-2 pl-6 text-left">
                    {"emailSchedule.Schedule"}
                  </td>
                  <td className="my-2 px-6 text-left">
                    <button className="mr-2" onClick={handleEditModal}>
                      <img src={editImg} alt="" />
                    </button>
                    <button onClick={handleDeleteModal}>
                      <img src={deleteImg} alt="" className="h-5 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <AddScheduleModal
            isOpen={isModalOpen}
            onClose={handleAddModal}
            editTrue={false}
          />
          <AddScheduleModal
            isOpen={isEditModalOpen}
            onClose={handleEditModal}
            editTrue={isEditModalOpen}
          />
          <DeleteScheduleModal isOpen={isDeleteModalOpen} onClose={handleDeleteModal}/>
        </div>
      </div>
    </>
  );
};

export default ListOfSchedules;
