import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "../../../schemas/index";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../store/product/productThunk";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";

const EditProductModal = ({ isOpen, onSave, onClose, product, id }) => {
  const dispatch = useDispatch();
  const { updateProductsLoader } = useSelector((state) => state.product);
  const { vendingMachines } = useSelector((state) => state.vendingMachine);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      productName: "",
      price: "",
      inventory: null,
    },
  });

  const [machineID, setMachineID] = useState(product?.machineID || "");
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [category, setCategory] = useState(product?.category || "");

  useEffect(() => {
    if (product) {
      setValue("productName", product.productName);
      setValue("price", product.price);
      setValue("inventory", product.inventory);
      setMachineID(product.machineID);
      setCategory(product.category);
    }
  }, [product, setValue]);

  const handleMachineIDChange = (event) => {
    const value = event.target.value;
    const machine = vendingMachines ? vendingMachines[value] : null;
    setMachineID(value);
    setSelectedMachine(machine);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    const result = AddProductSchema.safeParse(data);

    if (!result?.success) {
      return;
    }
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
        payload: payload,
        onSuccess: (value) => {
          onSave();
          onClose();
        },
        onError: (value) => {
          onClose();
        },
      })
    );
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-90 flex items-center justify-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 border dark:border-gray-600 text-center text-xs rounded-lg text-black dark:text-white font-quicksand box-border overflow-auto">
          <div className="bg-white dark:bg-gray-800 px-8 py-2 mb-8">
            <h2 className="flex items-center text-start font-bold left-[29px] text-[18px] text-dimgray">
              EDIT PRODUCT
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
                Product Name
              </label>
              <input
                type="text"
                {...register("productName")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your product name"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.productName?.message}
              </p>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                {...register("price")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your price"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.price?.message}
              </p>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Inventory
              </label>
              <input
                type="text"
                {...register("inventory")}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                placeholder="Enter your product's inventory"
                required
              />
              <p className="mt-1 text-sm text-destructive">
                {errors?.inventory?.message}
              </p>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 outline-none rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                <option value="Snack">Snack</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div className="flex flex-col mb-2 md:mb-4 items-start">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                Machine
              </label>
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
    </>
  );
};

export default EditProductModal;
