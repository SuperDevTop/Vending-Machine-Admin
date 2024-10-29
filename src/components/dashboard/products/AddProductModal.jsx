import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "../../../schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

// Redux actions
import { addProduct } from "../../../store/product/productThunk";

const AddProductModal = ({ isOpen, onSave, onClose }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const { addProductsLoader } = useSelector((state) => state.product);
  const { vendingMachines } = useSelector((state) => state.vendingMachine);

  // Local state
  const [machineID, setMachineID] = useState("");
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Form handling
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productName: "",
      price: "",
      inventory: null,
      slotNumber: null,
    },
  });

  // Early return if modal is not open
  if (!isOpen) return null;

  const handleMachineIDChange = (event) => {
    const value = event.target.value;
    const machine = vendingMachines ? vendingMachines[value] : null;
    setMachineID(value);
    setSelectedMachine(machine);
  };

  const handleClose = () => {
    reset();
    onClose();
    setMachineID("");
    setSelectedMachine(null);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const uniqueId = nanoid();
    const result = AddProductSchema.safeParse(data);

    if (!result?.success) {
      return;
    }

    const payload = {
      ...data,
      machineID,
    };

    dispatch(
      addProduct({
        id: uniqueId,
        payload,
        onSuccess: () => {
          onSave();
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      })
    );
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

  const FormField2 = ({ label, children, error }) => (
    <div className="mb-4">
      <label className="block text-left text-gray-700 dark:text-gray-300 font-bold mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border border-b-[1px] border-solid border-gainsboro overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
          <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
            ADD PRODUCT
            <button type="button" onClick={handleClose} className="ml-auto">
              <IoClose size={30} color="#A0AEC0" />
            </button>
          </h2>
        </div>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField label="Product Name" name="productName" />
          <FormField label="Price" name="price" />
          <FormField label="Inventory" name="inventory" />
          <FormField2 label="Slot Number" error={errors.slotNumber?.message}>
            <input
              type="number"
              {...register("slotNumber", { valueAsNumber: true })}
              min="1"
              placeholder={`Enter your slot number`}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            />
          </FormField2>

          {/* Machine Select */}
          <FormField label="Machine">
            <select
              value={machineID}
              onChange={handleMachineIDChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="">Select a machine</option>
              {vendingMachines &&
                Object.entries(vendingMachines).map(([id, machine]) => (
                  <option key={id} value={id}>
                    {machine?.machineName}
                  </option>
                ))}
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
              disabled={addProductsLoader}
              className="mt-4 w-24 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
            >
              {addProductsLoader ? (
                <ImSpinner8 className="spinning-icon" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
