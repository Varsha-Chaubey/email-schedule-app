import React, { type JSX, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import fetchHelper from "../api";

import Table from "../reuseComp/Table";
import DeleteScheduleModal from "./DeleteScheduleModal";
import ScheduleModal from "./ScheduleModal";

import searchImg from "./../assests/search.svg";
import addImg from "./../assests/add-icn.svg";

import "react-toastify/dist/ReactToastify.css";

interface ScheduleItem {
  _id: number;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  time: string;
  repeat: string;
}

const ListOfSchedules: React.FC = (): JSX.Element => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [editData, setEditData] = useState<ScheduleItem>();
  const [scheduleID, setScheduleID] = useState<ScheduleItem>();

  const handleAddModal = (item: any): void => {
    setIsModalOpen((prev: boolean) => !prev);
  };

  const handleEditModal = (item: ScheduleItem) => {
    setEditData(item);
    setIsEditModalOpen((prev: boolean) => !prev);
  };

  const handleDeleteModal = (item: ScheduleItem) => {
    setScheduleID(item);
    setIsDeleteModalOpen((prev: boolean) => !prev);
  };

  const fetchData = async () => {
    try {
      const response = await fetchHelper({
        url: "get",
      });
      setScheduleData(response ? response : []);
      setLoadingData(false);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchSearchData = async () => {
    try {
      let url = "search";
      if (searchKeyword.trim() !== "") {
        url += `?title=${encodeURIComponent(searchKeyword)}`;
      }else  return
      const response = await fetchHelper({ url });
      setScheduleData(response ? response : []);
    } catch (error: any) {
      console.error("Error fetching search data:", error.message);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  


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
                  className="border-none outline-none search-color font-bold w-full "
                  value={searchKeyword}
                  onKeyUp={(e)=>{
                    if(e.key==='Enter'){
                      fetchSearchData()
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if(e.target.value==="") fetchData()
                    setSearchKeyword(e.target.value);

                  }}
                />
                <img
                  src={searchImg}
                  alt=""
                  className="ml-2 cursor-pointer"
                  onClick={fetchSearchData}
                />
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
            <Table
              loading={loadingData}
              scheduleList={scheduleData}
              onEditClick={handleEditModal}
              onDeleteClick={handleDeleteModal}
            />
          </div>
          <ScheduleModal
            key={+isEditModalOpen}
            isOpen={isEditModalOpen || isModalOpen}
            onClose={isModalOpen ? handleAddModal : handleEditModal}
            fetchData={fetchData}
            editData={editData}
          />
          <DeleteScheduleModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeleteModal}
            fetchData={fetchData}
            scheduleID={scheduleID}
          />
          <ToastContainer autoClose={2000} />
        </div>
      </div>
    </>
  );
};

export default ListOfSchedules;
