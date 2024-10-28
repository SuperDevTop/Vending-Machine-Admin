import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "../../../schemas/index";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

// Redux actions
import { updateProduct } from "../../../store/product/productThunk";

const EditProductModal = ({ isOpen, onSave, onClose, product, id }) => {
  // Redux hooks
  const dispatch = useDispatch();
  const { updateProductsLoader } = useSelector((state) => state.product);
  const { vendingMachines } = useSelector((state) => state.vendingMachine);

  // Local state
  const [machineID, setMachineID] = useState(product?.machineID || "");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [category, setCategory] = useState(product?.category || "");

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
    },
  });

  // Initialize form with product data
  useEffect(() => {
    if (product) {
      setValue("productName", product.productName);
      setValue("price", product.price);
      setValue("inventory", product.inventory);
      setMachineID(product.machineID);
      setCategory(product.category);
    }
  }, [product, setValue]);

  // Early return if modal is not open
  if (!isOpen) return null;

  // Event handlers
  const handleMachineIDChange = (event) => {
    const value = event.target.value;
    const machine = vendingMachines ? vendingMachines[value] : null;
    setMachineID(value);
    setSelectedMachine(machine);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    reset();
    onClose();
    setCategory("");
    setMachineID("");
    setSelectedMachine(null);
  };

  // Form submission handler
  const onSubmit = async (data) => {
    const result = AddProductSchema.safeParse(data);

    if (!result?.success) {
      return;
    }

    // Validate product category matches machine type
    if (selectedMachine && selectedMachine.machineType !== category) {
      toast.error(
        `Product category (${category}) does not match machine type (${selectedMachine.machineType}).`
      );
      return;
    }

    const payload = {
      ...data,
      machineID,
      category,
    };

    dispatch(
      updateProduct({
        id,
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

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{ zIndex: 1000 }}>
      <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
          <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
            EDIT PRODUCT
            <button type="button" onClick={handleClose} className="ml-auto">
              <IoClose size={30} color="#A0AEC0" />
            </button>
          </h2>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Product Name" name="productName" />
          <FormField label="Price" name="price" />
          <FormField label="Inventory" name="inventory" />
          
          {/* Category Select */}
          <FormField label="Category">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="Snack">Snack</option>
              <option value="Beverage">Beverage</option>
            </select>
          </FormField>

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
              disabled={updateProductsLoader}
              className="mt-4 w-24 py-2 px-4 bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white rounded-md transition duration-200"
            >
              {updateProductsLoader ? (
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

export default EditProductModal;