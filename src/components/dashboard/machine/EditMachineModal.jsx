import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditMachineSchema } from "../../../schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";

// Redux actions
import { updateVendingMachine } from "../../../store/vendingMachine/VendingMachineThunk";

const EditMachineModal = ({ isOpen, onSave, onClose, machine, id }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const { updateVendingMachineLoader } = useSelector(
    (state) => state.vendingMachine
  );

  // Local state
  const [machineType, setMachineType] = useState(machine?.machineType || "");
  const [status, setStatus] = useState(machine?.status ? "Active" : "Inactive");

  // Form handling
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(EditMachineSchema),
    defaultValues: {
      machineName: "",
      description: "",
      location: "",
      machineType: "",
    },
  });

  // Initialize form with machine data
  useEffect(() => {
    if (machine) {
      setValue("machineName", machine.machineName);
      setValue("description", machine.description);
      setValue("location", machine.location);
      setValue("machineType", machine.machineType);
      setMachineType(machine.machineType);
      setStatus(machine.status ? "Active" : "Inactive");
    }
  }, [machine, setValue]);

  // Early return if modal is not open
  if (!isOpen) return null;

  // Event handlers
  const handleMachineTypeChange = (event) => {
    const value = event.target.value;
    setMachineType(value);
    setValue("machineType", value);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    setValue("status", value === "Active");
  };

  const handleClose = () => {
    reset();
    onClose();
    setStatus("");
    setMachineType("");
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const result = EditMachineSchema.safeParse(data);
    if (result.success) {
      const payload = {
        ...data,
        status: status === "Active",
        machineType: machineType,
      };

      dispatch(
        updateVendingMachine({
          id,
          payload,
          onSuccess: () => {
            onSave();
            handleClose();
          },
          onError: (error) => {
            console.error("Error updating machine", error);
            handleClose();
          },
        })
      );
    } else {
      console.log("Validation failed", result.error);
    }
  };

  // UI Components
  const FormField = ({ label, name, type = "text", children }) => (
    <div className="flex flex-col mb-2 md:mb-4 items-start">
      <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}
      </label>
      {children || (
        <input
          type={type}
          {...register(name)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          placeholder={`Enter your ${name.toLowerCase()}`}
          required
        />
      )}
      {errors[name] && (
        <p className="mt-1 text-sm text-destructive">{errors[name].message}</p>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{ zIndex: 1000 }}>
      <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
          <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
            EDIT VENDING MACHINE
            <button type="button" onClick={handleClose} className="ml-auto">
              <IoClose size={30} color="#A0AEC0" />
            </button>
          </h2>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Machine Name" name="machineName" />
          <FormField label="Description" name="description" />
          <FormField label="Location" name="location" />
          
          {/* Machine Type Select */}
          <FormField label="Machine Type">
            <select
              value={machineType}
              onChange={handleMachineTypeChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select a machine type</option>
              <option value="Snack">Snack</option>
              <option value="Beverage">Beverage</option>
            </select>
          </FormField>

          {/* Status Select */}
          <FormField label="Status">
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </FormField>

          {/* Action Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-center my-0 md:my-6 gap-2">
            <button
              onClick={handleClose}
              className="mt-4 w-24 py-2 px-4 text-gray-800 dark:text-gray-100 border dark:border rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateVendingMachineLoader}
              className="mt-4 w-24 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
            >
              {updateVendingMachineLoader ? (
                <ImSpinner8 className="spinning-icon" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMachineModal;