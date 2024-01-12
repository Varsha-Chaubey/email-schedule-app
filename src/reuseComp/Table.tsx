import React, {type JSX} from "react";
import editImg from "./../assests/edit-18x18.svg";
import deleteImg from "./../assests/delete.png";

interface ScheduleItem {
  _id: number;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  time: string;
  repeat: string;
}

interface TableProps {
  loading: boolean;
  onEditClick: (item: ScheduleItem) => void;
  onDeleteClick: (item: ScheduleItem) => void;
  scheduleList: ScheduleItem[];
}
const Table: React.FC<TableProps> = ({
  loading,
  onDeleteClick,
  onEditClick,
  scheduleList,
}):JSX.Element => {
  return (
    <>
      {loading? (
        <div className="mt-8 w-full sm:w-auto">{"Loading Schedules...."}</div>
      ) : (
        <>
          {scheduleList?.length<=0?(
             <div className="mt-24 border-collapse border-2 bg-white text-center mx-auto w-60 p-7">
              Data Not Found
             </div>
          ):(
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
                  {scheduleList?.length&&
                    scheduleList?.map((item) => {
                      return (
                        <tr key={item._id} className="text-sm bottom-border ">
                          <td className="my-2 pl-6 text-left capitalize">{item.title}</td>
                          <td className="my-2 pl-6 text-left description">
                            {item.description}
                          </td>
                          <td className="my-2 pl-6 text-left capitalize">{item.subject}</td>
                          <td className="my-2 pl-6 text-left ">{`${item.frequency} at ${item.time}`}</td>
                          <td className="my-2 px-6 text-left">
                            <button
                              className="mr-2"
                              onClick={() => onEditClick(item)}
                            >
                              <img src={editImg} alt="" />
                            </button>
                            <button onClick={() => onDeleteClick(item)}>
                              <img src={deleteImg} alt="" className="h-5 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              )}
         
        </>
      )}
    </>
  );
};

export default Table;
