import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoClose } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { updateVendingMachine } from "../../../store/vendingMachine/VendingMachineThunk";

// Zod schema for form validation
const inventorySchema = z.object({
  productInventory: z.array(
    z.object({
      productId: z.string().min(1, "Product selection is required"),
      quantity: z.number().min(0, "Quantity must be 0 or greater"),
    })
  ),
});

const FormField = ({ label, value, children }) => (
  <div className="flex flex-col mb-2 md:mb-4 items-start">
    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
      {label}
    </label>
    {children || (
      <input
        value={value}
        disabled={true}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      />
    )}
  </div>
);

const AddInventoryModal = ({
  isOpen,
  onSave,
  onClose,
  machineId,
  selectedMachine,
}) => {
  const dispatch = useDispatch();
  const { addInventoryLoader } = useSelector((state) => state.vendingMachine);
  const { products } = useSelector((state) => state.product);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      productInventory: [],
    },
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedProducts([]);
    onClose();
  };

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { productId: "", quantity: "" }]);
  };

  const handleRemoveProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, productId) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = { ...newProducts[index], productId };
    setSelectedProducts(newProducts);
  };

  const handleQuantityChange = (index, qty) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = {
      ...newProducts[index],
      quantity: qty === "" ? "" : parseInt(qty),
    };
    setSelectedProducts(newProducts);
  };

  const onSubmit = async () => {
    const productInventory = selectedProducts.reduce(
      (acc, { productId, quantity }) => {
        if (productId && quantity) {
          // Ensure quantity is filled
          acc[productId] = quantity;
        }
        return acc;
      },
      {}
    );

    const payload = {
      ...selectedMachine,
      productInventory,
    };

    dispatch(
      updateVendingMachine({
        id: machineId,
        payload,
        onSuccess: () => {
          onSave();
          handleClose();
        },
        onError: (error) => {
          console.error("Error updating machine:", error);
          handleClose();
        },
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl max-h-full bg-white dark:bg-gray-800 rounded-lg overflow-auto">
        <div className="p-6 border-b dark:border-gray-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Add Inventory
            </h2>
            <button onClick={handleClose}>
              <IoClose className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormField
              label="Machine Name"
              value={selectedMachine?.machineName}
            />
            <FormField label="Location" value={selectedMachine?.location} />
          </div>

          {selectedProducts.map((product, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <select
                value={product.productId}
                onChange={(e) => handleProductChange(index, e.target.value)}
                className="flex-1 p-2 border rounded-md dark:bg-gray-700"
              >
                <option value="">Select Product</option>
                {products &&
                  Object.entries(products).map(([id, prod]) => (
                    <option key={id} value={id}>
                      {prod.productName}
                    </option>
                  ))}
              </select>

              <input
                type="number"
                min="0"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="w-24 p-2 border rounded-md dark:bg-gray-700"
                placeholder="Qty"
              />

              <button
                type="button"
                onClick={() => handleRemoveProduct(index)}
                className="text-red-500 hover:text-red-700"
              >
                <IoIosRemoveCircleOutline className="w-6 h-6" />
              </button>
            </div>
          ))}

          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={handleAddProduct}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800"
            >
              Add Another Product
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addInventoryLoader}
              className="px-6 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 disabled:opacity-50"
            >
              {addInventoryLoader ? (
                <ImSpinner8 className="w-5 h-5 animate-spin" />
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

export default AddInventoryModal;
