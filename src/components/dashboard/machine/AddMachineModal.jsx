import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddMachineSchema } from "../../../schemas/index";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { addVendingMachine } from "../../../store/vendingMachine/VendingMachineThunk";
import { updateOperator } from "../../../store/operator/operatorThunk";
import { ImSpinner8 } from "react-icons/im";

const AddMachineModal = ({ isOpen, onSave, onClose }) => {
  const dispatch = useDispatch();
  const { addVendingMachineLoader } = useSelector(
    (state) => state.vendingMachine
  );
  const { operators } = useSelector((state) => state.operator);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddMachineSchema),
    defaultValues: {
      machineName: "",
      description: "",
      location: "",
      machineType: "",
    },
  });

  const [machineType, setMachineType] = useState("");
  const [operatorID, setOperatorID] = useState("");
  const [selectedOperator, setSelectedOperator] = useState(null);

  const handleMachineTypeChange = (event) => {
    const value = event.target.value;
    setMachineType(value);
    setValue("machineType", value);
  };

  const handleOperatorIDChange = (event) => {
    const value = event.target.value;
    const operator = operators[value];
    setOperatorID(value);
    setSelectedOperator(operator);
  };

  if (!isOpen) {
    return null;
  }

  // Handle form submission
  const onSubmit = async (data) => {
    const uniqueId = nanoid();
    const result = AddMachineSchema.safeParse(data);
    if (result.success) {
      const payload = {
        ...data,
        status: true,
        operatorId: operatorID,
      };
      dispatch(
        addVendingMachine({
          id: uniqueId,
          payload,
          onSuccess: () => {
            if (operatorID && selectedOperator) {
              dispatch(
                updateOperator({
                  id: operatorID,
                  payload: {
                    ...selectedOperator,
                    assignedMachines: [uniqueId],
                  },
                  onSuccess: () => {
                    onSave();
                    onClose();
                    setOperatorID("");
                    setSelectedOperator(null);
                  },
                  onError: (error) => {
                    console.error("Error updating operator:", error);
                    onClose();
                  },
                })
              );
            }
            onSave();
            onClose();
            reset();
          },
          onError: () => {
            onClose();
            reset();
          },
        })
      );
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border border-b-[1px] border-solid border-gainsboro overflow-auto">
          <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
            <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
              ADD VENDING MACHINE
              <button type="button" onClick={onClose} className="ml-auto">
                <IoClose size={30} color="#A0AEC0" />
              </button>
            </h2>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Machine Name
              </label>
              <input
                type="text"
                {...register("machineName")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your machine name"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.machineName?.message}
              </p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                {...register("description")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your description"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.description?.message}
              </p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your location"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.location?.message}
              </p>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Operator
              </label>
              <select
                value={operatorID}
                onChange={handleOperatorIDChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                <option value="">Select an operator</option>
                {operators &&
                  Object.entries(operators).map(([id, operator]) => (
                    <option key={id} value={id}>
                      {operator?.fname} {operator?.lname}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Machine Type
              </label>
              <select
                value={machineType}
                onChange={handleMachineTypeChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                <option value="">Select a machine type</option>
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center my-0 md:my-6 gap-2">
              <button
                onClick={onClose}
                className="mt-4 w-24 py-2 px-4 text-gray-800 dark:text-gray-100 border dark:border rounded-md transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addVendingMachineLoader}
                className="mt-4 w-24 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
              >
                {addVendingMachineLoader ? (
                  <ImSpinner8 className="spinning-icon" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMachineModal;
