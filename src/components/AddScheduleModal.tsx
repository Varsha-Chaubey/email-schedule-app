import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  editTrue: boolean;
  onClose: () => void;
}

const AddScheduleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  editTrue,
}) => {
  const [frequency, setFrequency] = useState<string>("daily");

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-end">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 max-w-lg border border-zinc-300 mr-40 ">
            <div className="flex justify-start items-center">
              {editTrue ? (
                <h4 className="text-slate-500 font-medium">Edit Schedule</h4>
              ) : (
                <h4 className="text-slate-500 font-medium">Add Schedule</h4>
              )}
            </div>
            <div className="">
              <form className="max-w-md mx-auto pt-3 flex flex-col text-sm">
                <div className="mb-4 flex">
                  <label
                    className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700 "
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-64"
                    type="text"
                    id="title"
                    name="title"
                  />
                </div>

                <div className="mb-4 flex">
                  <label
                    className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-64"
                    id="description"
                    name="description"
                    rows={3}
                  />
                </div>

                <div className="mb-4 flex">
                  <label
                    className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-64"
                    type="text"
                    id="subject"
                    name="subject"
                  />
                </div>

                <div className="mb-4 flex">
                  <label
                    className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700"
                    htmlFor="frequency"
                  >
                    Frequency
                  </label>
                  <select
                    className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-64"
                    id="frequency"
                    name="frequency"
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option value="">{""}</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                {frequency === "weekly" && (
                  <div className="mb-4 flex">
                    <label
                      className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700"
                      htmlFor="repeat"
                    >
                      Repeat
                    </label>
                    <div className="flex ">
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        S
                      </div>
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        M
                      </div>
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        T
                      </div>
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        W
                      </div>
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        T
                      </div>
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        F
                      </div>
                      <div className="h-8 w-8 rounded-full border border-zinc-300 p-1 mx-2 text-center ">
                        S
                      </div>
                    </div>
                  </div>
                )}

                {frequency === "monthly" && (
                  <div className="mb-4 flex">
                    <label
                      className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700"
                      htmlFor="repeat"
                    >
                      Repeat
                    </label>
                    <select
                      className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-64"
                      id="repeat"
                      name="repeat"
                      onChange={(e) => setFrequency(e.target.value)}
                    >
                      <option value="">{""}</option>
                      <option value="firstMonday">First Monday</option>
                      <option value="secondMonday">Second Monday</option>
                      <option value="thirdMonday">Third Monday</option>
                    </select>
                  </div>
                )}
                <div className="mb-4 flex">
                  <label
                    className="block text-sm font-bold mr-2 w-20 text-sm text-gray-700"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <select
                    className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-64"
                    id="time"
                    name="time"
                  >
                    <option value="">{""}</option>
                    <option value="10am">10 AM</option>
                    <option value="11am">11 AM</option>
                    <option value="12am">12 AM</option>
                  </select>
                </div>

                <div className="flex justify-end text-sm">
                  <button
                    className="mr-4 px-6 py-2 border border-zinc-300 rounded text-gray-700 hover:text-gray-900 bg-gray-100"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  {editTrue ? (
                    <button className="px-6 py-2 main-color text-white rounded ">
                      Update
                    </button>
                  ) : (
                    <button className="px-6 py-2 main-color text-white rounded ">
                      Done
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddScheduleModal;
