import React, { type JSX, useState } from "react";
import fetchHelper from "../api";
import { toast } from "react-toastify";

import Select from "../reuseComp/Select";
import DaysSelector from "../reuseComp/DaysSelector";
import InputFields from "../reuseComp/InputFields";

interface ScheduleItem {
  _id: number;
  title: string;
  description: string;
  subject: string;
  frequency: string;
  time: string;
  repeat: string;
}
interface ModalProps {
  isOpen: boolean;
  onClose: (item: any) => void;
  fetchData: () => void;
  editData: ScheduleItem | undefined;
}

const initialFormValues = {
  _id: 0,
  title: "",
  description: "",
  subject: "",
  frequency: "",
  repeat: "",
  time: "",
};

const ScheduleModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  fetchData,
  editData,
}): JSX.Element => {
  const [formData, setFormData] = useState<ScheduleItem>(
    editData ?? initialFormValues
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const apiEndpoint = editData ? `update/${formData._id}` : "create";

    const response = await fetchHelper({
      url: apiEndpoint,
      method: editData ? "PUT" : "POST",
      body: {
        ...formData,
        repeat:
          formData.frequency === "Weekly" || formData.frequency === "Monthly"
            ? formData.repeat
            : "",
      },
    });

    if (editData) {
      toast.success(response?.msg || "Scheduled Updated successfully");
    } else {
      toast.success(response?.msg || "Scheduled Created successfully");
    }
    setFormData(initialFormValues)
    fetchData();
    onClose(undefined);
  };

  console.log(formData)
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-end">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 max-w-lg border border-zinc-300 mr-40 ">
            <div className="flex justify-start items-center">
              {editData ? (
                <h4 className="text-slate-500 font-medium">Edit Schedule</h4>
              ) : (
                <h4 className="text-slate-500 font-medium">Add Schedule</h4>
              )}
            </div>
            <div className="">
              <form
                className="max-w-md mx-auto pt-3 flex flex-col text-sm"
                onSubmit={handleFormSubmit}
              >
                <InputFields
                  lable={"Title"}
                  value={formData && formData.title}
                  onChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      title: value,
                    }))
                  }
                />

                <div className="mb-4 flex">
                  <label
                    className="block text-sm font-bold mr-2 w-24 text-sm text-gray-700"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="flex-grow px-3 py-2 border border-zinc-300 rounded outline-none w-72"
                    name="description"
                    rows={3}
                    onChange={handleChange}
                    value={formData && formData.description}
                  />
                </div>

                <InputFields
                  lable={"Subject"}
                  value={formData && formData.subject}
                  onChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      subject: value,
                    }))
                  }
                />

                <Select
                  label={"Frequency"}
                  options={[
                    { value: "Daily", label: "Daily" },
                    { value: "Weekly", label: "Weekly" },
                    { value: "Monthly", label: "Monthly" },
                  ]}
                  value={formData && formData.frequency}
                  onChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      frequency: value,
                    }))
                  }
                />
                {formData && formData.frequency === "Weekly" && (
                  <div className="mb-4 flex">
                    <label
                      className="block text-sm font-bold mr-2 w-24 text-sm text-gray-700"
                      htmlFor="repeat"
                    >
                      Repeat
                    </label>
                    <DaysSelector
                      selectedDay={formData && formData.repeat}
                      onChange={(selectedDay) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          repeat: selectedDay,
                        }))
                      }
                    />
                  </div>
                )}

                {formData && formData.frequency === "Monthly" && (
                  <Select
                    label={"Repeat"}
                    options={[
                      { value: "First Monday", label: "First Monday" },
                      { value: "Second Monday", label: "Second Monday" },
                      { value: "Third Monday", label: "Third Monday" },
                    ]}
                    value={formData && formData.repeat}
                    onChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        repeat: value,
                      }))
                    }
                  />
                )}

                <Select
                  label={"Time"}
                  options={[
                    { value: "10:00AM", label: "10 AM" },
                    { value: "11:00AM", label: "11 AM" },
                    { value: "12:00PM", label: "12 PM" },
                    { value: "4:00PM", label: "4 PM" },
                  ]}
                  value={formData && formData.time}
                  onChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      time: value,
                    }))
                  }
                />

                <div className="flex justify-end text-sm">
                  <button
                    className="mr-4 px-6 py-2 border border-zinc-300 rounded text-gray-700 hover:text-gray-900 bg-gray-100"
                    onClick={onClose}
                  >
                    Cancel
                  </button>

                  {editData ? (
                    <button
                    className={`px-6 py-2 main-color text-white rounded ${
                      Object.entries(formData)
                        .filter(([key, value]) => key !== 'repeat') // Exclude 'repeat'
                        .every(([key, value]) => value !== '')
                        ? ''
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={handleFormSubmit}
                    disabled={
                      !Object.entries(formData)
                        .filter(([key, value]) => key !== 'repeat') // Exclude 'repeat'
                        .every(([key, value]) => value !== '')
                    }
                  >
                    Update
                  </button>
                  ) : (
                    <button
                      className={`px-6 py-2 main-color text-white rounded ${
                        Object.entries(formData)
                          .filter(([key, value]) => key !== 'repeat') // Exclude 'repeat'
                          .every(([key, value]) => value !== '')
                          ? ''
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={handleFormSubmit}
                      disabled={
                        !Object.entries(formData)
                          .filter(([key, value]) => key !== 'repeat') // Exclude 'repeat'
                          .every(([key, value]) => value !== '')
                      }
                    >
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

export default ScheduleModal;
